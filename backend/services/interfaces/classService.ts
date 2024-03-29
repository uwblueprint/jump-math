import type { Grade, QueryOptions } from "../../types";

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
  startDate: Date;
  gradeLevel: Grade;
  teacher: string;
}

export interface ClassResponseDTO {
  id: string;
  className: string;
  startDate: Date;
  gradeLevel: Grade;
  teacher: string;
  students: StudentResponseDTO[];
  isActive: boolean;
}

export type TestableStudentsDTO = Pick<
  ClassResponseDTO,
  "id" | "className" | "students"
>;

export interface ClassQueryOptions extends QueryOptions {
  excludeArchived?: boolean;
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
   * This method retrieves the students that can be tested in the given test session.
   * @param id test session id
   * @returns requested class
   * @throws Error if retrieval fails
   */
  getTestableStudentsByTestSessionId(
    testSessionId: string,
  ): Promise<TestableStudentsDTO>;

  /**
   * This method retrieves the classes associated with given teacher id.
   * @param id teacher id
   * @param queryOptions optional options for the query including sorting, filtering and pagination
   * @returns list of requested classes
   * @throws Error if retrieval fails
   */
  getClassesByTeacherId(
    teacherId: string,
    queryOptions?: ClassQueryOptions,
  ): Promise<Array<ClassResponseDTO>>;

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
   * This method archives the class with the given id
   * @param id class id
   * @param nowDate optional date to use as the archive date
   * @returns the id of the archived class
   * @throws Error if archive fails
   */
  archiveClass(id: string, nowDate?: Date): Promise<string>;

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
