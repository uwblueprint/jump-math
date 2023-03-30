import { UserDTO, Grade } from "../../types";
import { TestSessionResponseDTO } from "./testSessionService";

export interface StudentRequestDTO {
  firstName: string;
  lastName: string;
  studentNumber?: string;
}

export interface StudentResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber?: string;
}

export interface ClassRequestDTO {
  className: string;
  schoolYear: number;
  gradeLevel: Grade[];
  teacher: string;
  testSessions: string[];
  students?: StudentRequestDTO[];
}

export interface ClassResponseDTO {
  id: string;
  className: string;
  schoolYear: number;
  gradeLevel: Grade[];
  teacher: UserDTO;
  testSessions: TestSessionResponseDTO[];
  students: StudentResponseDTO[];
}

export interface IClassService {
  /**
   * This method creates a new class in the database.
   * @param classObj  new class
   * @returns the created class
   * @throws Error if creation fails
   */
  createClass(classObj: ClassRequestDTO): Promise<ClassResponseDTO>;

  /**
   * This method retrieves all classes
   * @param id class id
   * @returns requested class
   * @throws Error if retrieval fails
   */
  getClassById(id: string): Promise<ClassResponseDTO>;

  /**
   * This method updates the class with given id.
   * @param classObj The request object containing information about the updated class
   * @returns the new updated ClassResponseDTO
   * @throws Error if retrieval fails
   */
  updateClass(id: string, classObj: ClassRequestDTO): Promise<ClassResponseDTO>;

  /**
   * This method deletes the class with given id
   * @param id class id
   * @returns
   * @throws Error if retrieval fails
   */
  deleteClass(id: string): Promise<string>;

  /**
   * This method creates a new student in the database.
   * @param student new student
   * @returns the created student
   * @throws Error if creation fails
   */
  createStudent(
    student: StudentRequestDTO,
    classId: string,
  ): Promise<ClassResponseDTO>;

  /**
   * This method updates the student with given id.
   * @param student The request object containing information about the updated student
   * @returns the new updated ClassResponseDTO
   * @throws Error if retrieval fails
   */
  updateStudent(
    studentId: string,
    classId: string,
    student: StudentRequestDTO,
  ): Promise<ClassResponseDTO>;

  /**
   * This method deletes the student with given id
   * @param id student id class id
   * @returns
   * @throws Error if retrieval fails
   */
  deleteStudent(studentId: string, classId: string): Promise<string>;
}
