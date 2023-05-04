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
import { ITestSessionService } from "../interfaces/testSessionService";

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
      testSessions: [],
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

  async getClassByTestSessionId(
    testSessionId: string,
  ): Promise<ClassResponseDTO> {
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
    } catch (error: unknown) {
      Logger.error(`Failed to get Class. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
    return (await this.mapClassToClassDTOs(classes))[0];
  }

  async getClassesByTeacherId(
    teacherId: string,
  ): Promise<Array<ClassResponseDTO>> {
    let classes: Class[];
    try {
      classes = await MgClass.find({ teacher: { $eq: teacherId } });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get classes by teacher id. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return this.mapClassToClassDTOs(classes);
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
        { $set: classObj },
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
}

export default ClassService;
