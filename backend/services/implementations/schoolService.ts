import {
  ISchoolService,
  SchoolRequestDTO,
  SchoolResponseDTO,
} from "../interfaces/schoolService";
import MgSchool, { School } from "../../models/school.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { UserDTO } from "../../types";
import IUserService from "../interfaces/userService";

const Logger = logger(__filename);

class SchoolService implements ISchoolService {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  // This method gets all schools from the database.
  async getAllSchools(): Promise<SchoolResponseDTO[]> {
    try {
      const schools: Array<School> = await MgSchool.find();
      return await Promise.all(
        schools.map(async (school) => {
          const teacherDTOs: Array<UserDTO> = await this.userService.findAllUsersByIds(
            school.teachers,
          );

          return {
            id: school.id,
            name: school.name,
            country: school.country,
            subRegion: school.subRegion,
            city: school.city,
            address: school.address,
            teachers: teacherDTOs,
          };
        }),
      );
    } catch (error: unknown) {
      Logger.error(`Failed to get schools. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  // This method gets all schools with the given sub-region from the database.
  async getSchoolsBySubregion(subRegion: string): Promise<SchoolResponseDTO[]> {
    let schools: Array<School> | null;

    try {
      schools = await MgSchool.find({ subRegion: { $eq: subRegion } });
      
      // check if no schools match the given sub-region
      if (!schools.length) {
        throw new Error(`Sub region ${subRegion} not found`);
      }

      return await Promise.all(
        schools.map(async (school) => {
          const teacherDTOs: Array<UserDTO> = await this.userService.findAllUsersByIds(
            school.teachers,
          );

          return {
            id: school.id,
            name: school.name,
            country: school.country,
            subRegion: school.subRegion,
            city: school.city,
            address: school.address,
            teachers: teacherDTOs,
          };
        }),
      );
    } catch (error: unknown) {
      Logger.error(`Failed to get schools. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  /**
   * This method creates a new school in the database.
   *
   * @param school The request object containing information about the school
   * to create
   */
  async createSchool(school: SchoolRequestDTO): Promise<SchoolResponseDTO> {
    let teacherDTOs: Array<UserDTO>;
    let newSchool: School | null;
    try {
      // get the user details for each teacher
      teacherDTOs = await this.userService.findAllUsersByIds(school.teachers);

      // check that all teachers exist as users
      if (teacherDTOs.length !== school.teachers.length) {
        throw new Error("One or more of the teacher IDs was not found");
      }

      // create a new School document
      newSchool = await MgSchool.create({ ...school });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create school. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: newSchool.id,
      name: newSchool.name,
      country: newSchool.country,
      subRegion: newSchool.subRegion,
      city: newSchool.city,
      address: newSchool.address,
      teachers: teacherDTOs,
    };
  }
}

export default SchoolService;
