import type { UserDTO } from "../../types";
import type { Class } from "../../models/class.model";
import MgClass from "../../models/class.model";
import MgTestSession from "../../models/testSession.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import type {
  IClassService,
  ClassRequestDTO,
  ClassResponseDTO,
  StudentRequestDTO,
  ClassQueryOptions,
  TestableStudentsDTO,
} from "../interfaces/classService";
import type IUserService from "../interfaces/userService";
import type { ITestSessionService } from "../interfaces/testSessionService";
import {
  applyQueryOptions,
  mapDocumentsToDTOs,
  mapDocumentToDTO,
} from "../../utilities/generalUtils";

const Logger = logger(__filename);

class ClassService implements IClassService {
  userService: IUserService;

  testSessionService: ITestSessionService;

  constructor(
    userService: IUserService,
    testSessionService: ITestSessionService,
  ) {
    this.userService = userService;
    this.testSessionService = testSessionService;
  }

  /* eslint-disable class-methods-use-this */
  async createClass(classObj: ClassRequestDTO): Promise<ClassResponseDTO> {
    let teacherDTO: UserDTO;
    let newClass: Class | null;

    try {
      // get the user details for the teacher
      teacherDTO = await this.userService.getUserById(classObj.teacher);

      if (!teacherDTO) {
        throw new Error("Teacher ID was not found");
      }

      // create a new class document
      newClass = await MgClass.create({
        ...classObj,
        testSessions: [],
        students: [],
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create class. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: newClass.id,
      className: newClass.className,
      startDate: newClass.startDate,
      gradeLevel: newClass.gradeLevel,
      isActive: newClass.isActive,
      teacher: newClass.teacher,
      testSessions: newClass.testSessions,
      students: newClass.students,
    };
  }

  async getClassById(id: string): Promise<ClassResponseDTO> {
    let classObj: Class | null;
    try {
      classObj = await MgClass.findById(id);
      if (!classObj) {
        throw new Error(`Class id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get Class. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
    return mapDocumentToDTO(classObj);
  }

  async getTestableStudentsByTestSessionId(
    testSessionId: string,
  ): Promise<TestableStudentsDTO> {
    let classes: Class[];
    try {
      classes = await MgClass.find({ testSessions: { $eq: testSessionId } });
      if (!classes.length) {
        throw new Error(
          `Class with test session id ${testSessionId} not found`,
        );
      } else if (classes.length > 1) {
        throw new Error(
          `More than one class has the same Test Session of id ${testSessionId}`,
        );
      }

      // Filter out students who have already completed the test
      const testSession = await this.testSessionService.getTestSessionById(
        testSessionId,
      );
      const completedStudents = new Set(
        testSession.results?.map((result) => result.student),
      );
      classes[0].students = classes[0].students.filter(
        (student) => !completedStudents.has(student.id),
      );
    } catch (error: unknown) {
      Logger.error(`Failed to get Class. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    const { id, className, students } = classes[0];
    return { id, className, students };
  }

  async getClassesByTeacherId(
    teacherId: string,
    queryOptions?: ClassQueryOptions,
  ): Promise<Array<ClassResponseDTO>> {
    let classes: Class[];
    try {
      const query = MgClass.find({
        teacher: { $eq: teacherId },
      });
      applyQueryOptions(query, queryOptions);
      if (queryOptions?.excludeArchived) {
        query.where({ isActive: { $in: [true, undefined] } });
      }
      classes = await query;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get classes by teacher id. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return mapDocumentsToDTOs(classes);
  }

  async updateClass(
    id: string,
    classObj: ClassRequestDTO,
  ): Promise<ClassResponseDTO> {
    let updatedClass: Class | null;
    try {
      updatedClass = await MgClass.findOneAndUpdate(
        { _id: id, isActive: { $in: [true, undefined] } },
        classObj,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedClass) {
        throw new Error(`Class id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update class. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return mapDocumentToDTO(updatedClass);
  }

  async deleteClass(id: string): Promise<string> {
    try {
      const deletedClass: Class | null = await MgClass.findByIdAndDelete(id);
      if (!deletedClass) {
        throw new Error(`Class with id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete class. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async archiveClass(id: string, nowDate?: Date): Promise<ClassResponseDTO> {
    let archivedClass: Class | null;
    const date = nowDate ?? new Date();

    try {
      archivedClass = await MgClass.findOneAndUpdate(
        { _id: id, isActive: { $in: [true, undefined] } },
        { $set: { isActive: false } },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!archivedClass) {
        throw new Error(
          `Class with id ${id} not found or not currently active`,
        );
      }

      // Make a best effort to delete upcoming test sessions and end active test sessions
      await this.deleteUpcomingTestSessions(
        archivedClass.testSessions,
        date,
        id,
      );
      await this.endActiveTestSessions(archivedClass.testSessions, date);

      // Refresh the archived class object
      archivedClass = await MgClass.findById(id);
      if (!archivedClass) {
        throw new Error(`Class with id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to archive class with id ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return mapDocumentToDTO(archivedClass);
  }

  async createStudent(
    student: StudentRequestDTO,
    classId: string,
  ): Promise<ClassResponseDTO> {
    let classObj: Class | null;

    try {
      classObj = await MgClass.findOneAndUpdate(
        { _id: classId, isActive: { $in: [true, undefined] } },
        {
          $push: { students: student },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!classObj) {
        throw new Error(`Class with id ${classId} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to create student in class ${classId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return mapDocumentToDTO(classObj);
  }

  async updateStudent(
    studentId: string,
    classId: string,
    student: StudentRequestDTO,
  ): Promise<ClassResponseDTO> {
    let classObj: Class | null;
    try {
      classObj = await MgClass.findOneAndUpdate(
        {
          _id: classId,
          "students._id": studentId,
          isActive: { $in: [true, undefined] },
        },
        {
          $set: {
            "students.$": student,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!classObj) {
        throw new Error(
          `Student with id ${studentId} could not be updated for class with id ${classId}`,
        );
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update student. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return mapDocumentToDTO(classObj);
  }

  async deleteStudent(studentId: string, classId: string): Promise<string> {
    try {
      const result = await MgClass.updateOne(
        { _id: classId, isActive: { $in: [true, undefined] } },
        {
          $pull: { students: { _id: studentId } },
        },
      );

      if (!result.matchedCount) {
        throw new Error(
          `Student with id ${studentId} in class with id ${classId} was not deleted`,
        );
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete student with id ${studentId} from class with id ${classId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return studentId;
  }

  private async deleteUpcomingTestSessions(
    testSessions: string[],
    nowDate: Date,
    classId: string,
  ): Promise<void> {
    try {
      const testSessionsToDelete: string[] = await MgTestSession.find({
        _id: { $in: testSessions },
        startDate: { $gt: nowDate },
      }).distinct("_id");

      // Delete the upcoming test sessions
      await MgTestSession.deleteMany({
        _id: { $in: testSessionsToDelete },
      });
      await MgClass.updateMany(
        { _id: classId },
        { $pull: { testSessions: { $in: testSessionsToDelete } } },
        { new: true },
      );
    } catch (error: unknown) {
      Logger.info(
        `Failed to delete upcoming test sessions. Reason = ${getErrorMessage(
          error,
        )}`,
      );
    }
  }

  private async endActiveTestSessions(
    testSessions: string[],
    nowDate: Date,
  ): Promise<void> {
    try {
      await MgTestSession.updateMany(
        {
          _id: { $in: testSessions },
          startDate: { $lte: nowDate },
          endDate: { $gte: nowDate },
        },
        {
          $set: { endDate: nowDate },
        },
      );
    } catch (error: unknown) {
      Logger.info(
        `Failed to end active test sessions. Reason = ${getErrorMessage(
          error,
        )}`,
      );
    }
  }
}

export default ClassService;
