import SchoolService from "../../services/implementations/schoolService";
import {
  ISchoolService,
  SchoolRequestDTO,
  SchoolResponseDTO,
} from "../../services/interfaces/schoolService";
import UserService from "../../services/implementations/userService";
import IUserService from "../../services/interfaces/userService";

const userService: IUserService = new UserService();
const schoolService: ISchoolService = new SchoolService(userService);

const schoolResolvers = {
  Query: {
    school: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<SchoolResponseDTO> => {
      return schoolService.getSchoolById(id);
    },
    schools: async (): Promise<SchoolResponseDTO[]> => {
      return schoolService.getAllSchools();
    },
  },
  Mutation: {
    createSchool: async (
      _parent: undefined,
      { school }: { school: SchoolRequestDTO },
    ): Promise<SchoolResponseDTO> => {
      const newSchool = await schoolService.createSchool(school);
      return newSchool;
    },
  },
};

export default schoolResolvers;
