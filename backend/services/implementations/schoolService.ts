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

  /**
   * This method gets all schools from the database.
   */
  async getAllSchools(): Promise<Array<SchoolResponseDTO>> {
    try {
      const schools: Array<School> = await MgSchool.find();
      return await this.mapSchoolsToSchoolResponseDTOs(schools);
    } catch (error: unknown) {
      Logger.error(`Failed to get schools. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  /**
   * This method gets all schools with the given sub-region from the database.
   */
  async getSchoolsBySubregion(subRegion: string): Promise<SchoolResponseDTO[]> {
    let schoolDtos: Array<SchoolResponseDTO> = [];

    try {
      const schools: Array<School> = await MgSchool.find({
        subRegion: { $eq: subRegion },
      });

      schoolDtos = await this.mapSchoolsToSchoolResponseDTOs(schools);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get schools for sub-region ${subRegion}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return schoolDtos;
  }

  /**
   * This method gets all schools with the given country from the database.
   */
  async getSchoolsByCountry(country: string): Promise<SchoolResponseDTO[]> {
    let schools: Array<School> | null;

    try {
      schools = await MgSchool.find({ country });
      return await this.mapSchoolsToSchoolResponseDTOs(schools);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get schools for country ${country}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  private async mapSchoolsToSchoolResponseDTOs(
    schools: Array<School>,
  ): Promise<Array<SchoolResponseDTO>> {
    return Promise.all(
      schools.map(async (school) => {
        const teacherDTOs: Array<UserDTO> =
          await this.userService.findAllUsersByIds(school.teachers);

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

  async updateSchool(
    id: string,
    school: SchoolRequestDTO,
  ): Promise<SchoolResponseDTO> {
    let updatedSchool: School | null;
    try {
      updatedSchool = await MgSchool.findByIdAndUpdate(id, school, {
        new: true,
        runValidators: true,
      });

      if (!updatedSchool) {
        throw new Error(`School id ${id} not found`);
      }
      return (
        await this.mapSchoolsToSchoolResponseDTOs([updatedSchool as School])
      )[0];
    } catch (error: unknown) {
      Logger.error(
        `Failed to update school. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default SchoolService;
