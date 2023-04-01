import { UserDTO } from "../../types";
import MgClass, { Class } from "../../models/class.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  IClassService,
  ClassRequestDTO,
  ClassResponseDTO,
  StudentRequestDTO,
} from "../interfaces/classService";
import IUserService from "../interfaces/userService";
import {
  ITestSessionService,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";

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
    const testSessions: TestSessionResponseDTO[] = [];
    let newClass: Class | null;

    try {
      // get the user details for the teacher
      teacherDTO = await this.userService.getUserById(classObj.teacher);

      if (!teacherDTO) {
        throw new Error("Teacher ID was not found");
      }

      // get the test session details for each test session
      classObj.testSessions.forEach(async (classTestSession) => {
        testSessions.push(
          await this.testSessionService.getTestSessionById(classTestSession),
        );
      });

      // create a new class document
      newClass = await MgClass.create({ ...classObj });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create class. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: newClass.id,
      className: newClass.className,
      schoolYear: newClass.schoolYear,
      gradeLevel: newClass.gradeLevel,
      teacher: teacherDTO,
      testSessions,
      students: [],
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
    return (await this.mapClassToClassDTOs([classObj]))[0];
  }

  private async mapClassToClassDTOs(
    classObjs: Array<Class>,
  ): Promise<Array<ClassResponseDTO>> {
    const classDtos: Array<ClassResponseDTO> = await Promise.all(
      classObjs.map(async (classObj) => {
        const teacherDTO: UserDTO = await this.userService.getUserById(
          classObj.teacher,
        );

        const testSessionIds = classObj.testSessions;
        const testSessionPromises = testSessionIds.map((id) =>
          this.testSessionService.getTestSessionById(id),
        );
        const testSessionDTOs = await Promise.all(testSessionPromises);

        return {
          id: classObj.id,
          className: classObj.className,
          schoolYear: classObj.schoolYear,
          gradeLevel: classObj.gradeLevel,
          teacher: teacherDTO,
          testSessions: testSessionDTOs,
          students: classObj.students,
        };
      }),
    );
    return classDtos;
  }

  async updateClass(
    id: string,
    classObj: ClassRequestDTO,
  ): Promise<ClassResponseDTO> {
    let updatedClass: Class | null;
    try {
      updatedClass = await MgClass.findByIdAndUpdate(
        id,
        {
          className: classObj.className,
          schoolYear: classObj.schoolYear,
          gradeLevel: classObj.gradeLevel,
          teacher: classObj.teacher,
          testSessions: classObj.testSessions,
        },
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
    return (await this.mapClassToClassDTOs([updatedClass]))[0];
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

  async createStudent(
    student: StudentRequestDTO,
    classId: string,
  ): Promise<ClassResponseDTO> {
    let classObj: Class | null;

    try {
      classObj = await MgClass.findOneAndUpdate(
        { _id: classId },
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
    return (await this.mapClassToClassDTOs([classObj]))[0];
  }

  async updateStudent(
    studentId: string,
    classId: string,
    student: StudentRequestDTO,
  ): Promise<ClassResponseDTO> {
    let classObj: Class | null;
    try {
      classObj = await MgClass.findOneAndUpdate(
        { _id: classId, "students._id": studentId },
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
    return (await this.mapClassToClassDTOs([classObj]))[0];
  }

  async deleteStudent(studentId: string, classId: string): Promise<string> {
    try {
      const result = await MgClass.findByIdAndUpdate(
        classId,
        {
          $pull: { students: { _id: studentId } },
        },
        { new: true, runValidators: true },
      );

      if (!result) {
        throw new Error(
          `Class with id ${classId}, student with id ${studentId} was not deleted`,
        );
      }
      return studentId;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete student from class. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default ClassService;
