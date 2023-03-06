import { UserDTO } from "../../types";
import MgClass, { Class } from "../../models/class.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import MgTestSession, {
    TestSession,
} from "../../models/testSession.model";
import {
    IClassService,
    ClassRequestDTO,
    ClassResponseDTO,
} from "../interfaces/classService";
import IUserService from "../interfaces/userService";

const Logger = logger(__filename);

class ClassService implements IClassService {
    userService: IUserService;

    constructor(userService: IUserService){
        this.userService = userService; 
    }

    /**
     * This method creates a new class in the database.
     *
     * @param class The request object containing information about the school
     * to create
     */
    async createClass(class: ClassRequestDTO): Promise<ClassResponseDTO> {
        let teacherDTO: UserDTO;
        let testSessions: TestSession[] = [];
        let newClass: Class | null;
        try {
        // get the user details for the teacher
        teacherDTO = await this.userService.getUserById(class.teacher);
        
        if (!teacherDTO) {
            throw new Error("Teacher ID was not found");
          }
        
        // get the test session details for each test session
        class.test_sessions.forEach(classTestSession => {
            testSessions.push(await MgTestSession.getTestSessionById(classTestSession.id))
        });

        // create a new class document
        newClass = await MgClass.create({ ...class });
        } catch (error: unknown) {
            Logger.error(
                `Failed to create class. Reason = ${getErrorMessage(error)}`,
            );
            throw error;
        }

        return {
            id: newClass.id,
            class_name: newClass.name,
            school_year: newClass.school_year,
            grade_level: newClass.grade_level,
            teacher: teacherDTO,
            test_sessions: testSessions,
        };
    }
    async getClassById(id: string): Promise<ClassResponseDTO> {
        let class: Class | null;
        try {
          class = await MgClass.findById(id);
          if (!class) {
            throw new Error(`Class id ${id} not found`);
          }
        } catch (error: unknown) {
          Logger.error(`Failed to get Class. Reason = ${getErrorMessage(error)}`);
          throw error;
        }
    
        return {
            id: class.id,
            class_name: class.name,
            school_year: class.school_year,
            grade_level: class.grade_level,
            teacher: class.teacher,
            test_sessions: class.test_sessions,
        }
    }
    async updateClass(
        id: string,
        class: ClassRequestDTO,
    ): Promise<ClassResponseDTO> {
        let updatedClass: Class | null;
        try {
          updatedClass = await MgClass.findByIdAndUpdate(id, class, {
            new: true,
            runValidators: true,
          });
    
          if (!updatedClass) {
            throw new Error(`Class id ${id} not found`);
          }
          return {
                id: class.id,
                class_name: class.name,
                school_year: class.school_year,
                grade_level: class.grade_level,
                teacher: class.teacher,
                test_sessions: class.test_sessions,
            };
        } catch (error: unknown) {
          Logger.error(
            `Failed to update class. Reason = ${getErrorMessage(error)}`,
          );
          throw error;
        }
    }
    async deleteClass(id: string): Promise<string> {
        try {
          const deletedClass: Class | null = await MgClass.findByIdAndDelete(id);
          if (!deletedClass) {
            throw new Error(`School with id ${id} not found`);
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