import { UserDTO } from "../../types";
import MgClass, { Class } from "../../models/class.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  IClassService,
  ClassRequestDTO,
  ClassResponseDTO,
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

  /**
   * This method creates a new class in the database.
   *
   * @param classObj The request object containing information about the class
   * to create
   */
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
      students: newClass.students,
    };
  }

  /**
   * This method gets a class by id in the database.
   *
   * @param id The id of the class
   */
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

  /**
   * This method assigns teacher and testSession ids to their respective ResponseDTOs
   *
   * @param classObjs array of Class objects
   */
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

  /**
   * This method updates a class in the database.
   *
   * @param id The id of the class
   * @param classObj The requested changes
   */
  async updateClass(
    id: string,
    classObj: ClassRequestDTO,
  ): Promise<ClassResponseDTO> {
    let updatedClass: Class | null;
    try {
      updatedClass = await MgClass.findByIdAndUpdate(id, classObj, {
        new: true,
        runValidators: true,
      });
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

  /**
   * This method deletes a class in the database.
   *
   * @param id The id of the class
   */
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
}

export default ClassService;
