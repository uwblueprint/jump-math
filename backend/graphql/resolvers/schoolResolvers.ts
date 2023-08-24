import SchoolService from "../../services/implementations/schoolService";
import type {
  ISchoolService,
  SchoolResponseDTO,
} from "../../services/interfaces/schoolService";
import UserService from "../../services/implementations/userService";
import type IUserService from "../../services/interfaces/userService";

const userService: IUserService = new UserService();
const schoolService: ISchoolService = new SchoolService(userService);

const schoolResolvers = {
  Query: {
    school: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<SchoolResponseDTO> => {
      return schoolService.getSchoolById(id);
    },
    schoolByTeacherId: (
      _parent: undefined,
      { teacherId }: { teacherId: string },
    ) => schoolService.getSchoolByTeacherId(teacherId),
    schools: async (): Promise<SchoolResponseDTO[]> => {
      return schoolService.getAllSchools();
    },
  },
};

export default schoolResolvers;
