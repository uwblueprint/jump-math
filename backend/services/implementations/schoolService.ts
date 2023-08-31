import type {
  ISchoolService,
  SchoolRequestDTO,
  SchoolResponseDTO,
} from "../interfaces/schoolService";
import type { School } from "../../models/school.model";
import MgSchool from "../../models/school.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import type { UserDTO } from "../../types";
import type IUserService from "../interfaces/userService";
import {
  mapDocumentsToDTOs,
  mapDocumentToDTO,
} from "../../utilities/generalUtils";

const Logger = logger(__filename);

class SchoolService implements ISchoolService {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  /* eslint-disable class-methods-use-this */

  /**
   * This method gets all schools from the database.
   */
  async getAllSchools(): Promise<Array<SchoolResponseDTO>> {
    try {
      const schools = await MgSchool.find();
      return mapDocumentsToDTOs(schools);
    } catch (error: unknown) {
      Logger.error(`Failed to get schools. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getSchoolById(id: string): Promise<SchoolResponseDTO> {
    let school: School | null;
    try {
      school = await MgSchool.findById(id);
      if (!school) {
        throw new Error(`School id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get School. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return mapDocumentToDTO(school);
  }

  async getSchoolByTeacherId(teacherId: string): Promise<SchoolResponseDTO> {
    let school: School[];
    try {
      school = await MgSchool.find({ teachers: { $in: teacherId } });
      if (!school.length) {
        throw new Error(`School with teacher ${teacherId} not found`);
      } else if (school.length > 1) {
        throw new Error(
          `More than one school has the same teacher of id ${teacherId}`,
        );
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get School. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return mapDocumentToDTO(school[0]);
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
      id: newSchool.id.toString(),
      name: newSchool.name,
      country: newSchool.country,
      subRegion: newSchool.subRegion,
      city: newSchool.city,
      address: newSchool.address,
      teachers: teacherDTOs.map((teacher) => teacher.id.toString()),
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
      return mapDocumentToDTO(updatedSchool);
    } catch (error: unknown) {
      Logger.error(
        `Failed to update school. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default SchoolService;
