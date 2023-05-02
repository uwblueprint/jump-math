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
  gradeLevel: Grade;
  teacher: string;
}

export interface ClassResponseDTO {
  id: string;
  className: string;
  schoolYear: number;
  gradeLevel: Grade;
  teacher: UserDTO;
  testSessions: TestSessionResponseDTO[];
  students: StudentResponseDTO[];
}

export interface IClassService {
  /**
   * This method creates a new class in the database.
   * @param classObj new class
   * @returns the created class
   * @throws Error if creation fails
   */
  createClass(classObj: ClassRequestDTO): Promise<ClassResponseDTO>;

  /**
   * This method retrieves the class with given id.
   * @param id class id
   * @returns requested class
   * @throws Error if retrieval fails
   */
  getClassById(id: string): Promise<ClassResponseDTO>;

  /**
   * This method retrieves the class with given test session id.
   * @param id test session id
   * @returns requested class
   * @throws Error if retrieval fails
   */
  getClassByTestSessionId(testSessionId: string): Promise<ClassResponseDTO>;

  /**
   * This method retrieves the classes associated with given teacher id.
   * @param id teacher id
   * @returns list of requested classes
   * @throws Error if retrieval fails
   */
  getClassesByTeacherId(teacherId: string): Promise<Array<ClassResponseDTO>>;

  /**
   * This method updates the class with given id.
   * @param id The unique identifier of the class to update
   * @param classObj The request object containing information about the updated class
   * @returns the new updated ClassResponseDTO
   * @throws Error if update fails
   */
  updateClass(id: string, classObj: ClassRequestDTO): Promise<ClassResponseDTO>;

  /**
   * This method deletes the class with given id
   * @param id class id
   * @returns the id of the deleted class
   * @throws Error if deletion fails
   */
  deleteClass(id: string): Promise<string>;

  /**
   * This method creates a new student in the database.
   * @param student new student
   * @param classId The unique identifier of the class to create the student in
   * @returns the created student
   * @throws Error if creation fails
   */
  createStudent(
    student: StudentRequestDTO,
    classId: string,
  ): Promise<ClassResponseDTO>;

  /**
   * This method updates the student with given id.
   * @param classId The unique identifier of the class to update the student in
   * @param studentId The unique identifier of the student to update
   * @param student The request object containing information about the updated student
   * @returns the new updated ClassResponseDTO
   * @throws Error if update fails
   */
  updateStudent(
    studentId: string,
    classId: string,
    student: StudentRequestDTO,
  ): Promise<ClassResponseDTO>;

  /**
   * This method deletes the student with given id
   * @param studentId The unique identifier of the student to delete
   * @param classId The unique identifier of the class to delete the student from
   * @returns the id of the deleted student
   * @throws Error if deletion fails
   */
  deleteStudent(studentId: string, classId: string): Promise<string>;
}
