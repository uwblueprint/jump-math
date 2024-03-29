/**
 * This interface contains the request object that is fed into
 * the school service to create or update the school in the database.
 */
export interface SchoolRequestDTO {
  /** the name of the school */
  name: string;
  /** the country the school is located in */
  country: string;
  /** the sub-region the school is located in */
  subRegion: string;
  /** the city the school is located in */
  city: string;
  /** the address of the school */
  address: string;
  /** the teachers that teach at the school (reference to the IDs in the User table) */
  teachers: string[];
}

/**
 * This interface contains the response object that is returned by the
 * school service to represent a school in the database.
 */
export interface SchoolResponseDTO {
  /** the unique identifier for the school */
  id: string;
  /** the name of the school */
  name: string;
  /** the country the school is located in */
  country: string;
  /** the sub-region the school is located in */
  subRegion: string;
  /** the city the school is located in */
  city: string;
  /** the address of the school */
  address: string;
  /** the IDs of teachers that teach at the school */
  teachers: string[];
}

/**
 * This service contains methods that allow operations to be perfomed
 * on the School entity in the datbase.
 */
export interface ISchoolService {
  /**
   * This method retrieves all Schools
   * @param
   * @returns returns array of SchoolResponseDTO
   * @throws Error if retrieval fails
   */
  getAllSchools(): Promise<Array<SchoolResponseDTO>>;

  /**
   * This method creates a new school in the database.
   * @param school The request object containing information about the school to create
   * @returns the created SchoolResponseDTO
   * @throws Error if creation fails
   */
  createSchool(school: SchoolRequestDTO): Promise<SchoolResponseDTO>;

  /**
   * This method updates the school with given id.
   * @param school The request object containing information about the updated school
   * @returns the new updated SchoolResponseDTO
   * @throws Error if creation fails
   */
  updateSchool(
    id: string,
    school: SchoolRequestDTO,
  ): Promise<SchoolResponseDTO>;

  /**
   * This method retrieves a school by its unique identifier
   * @param id The unique identifier to get the school by
   */
  getSchoolById(id: string): Promise<SchoolResponseDTO>;

  /**
   * This method retrieves the school related to a given teacher.
   * @param teacherId The unique identifier for a teacher
   */
  getSchoolByTeacherId(teacherId: string): Promise<SchoolResponseDTO>;
}
