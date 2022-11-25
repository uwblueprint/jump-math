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
  Mutation: {
    createSchool: async (
      _parent: undefined,
      { school }: { school: SchoolRequestDTO },
    ): Promise<SchoolResponseDTO> => {
      const newSchool = await schoolService.createSchool(school);
      return newSchool;
    },
    addTeacherToSchool: async (
      _parent: undefined,
      {
        school,
        schoolId,
        teacherId,
      }: { school: SchoolRequestDTO; schoolId: string; teacherId: string },
    ): Promise<SchoolResponseDTO> => {
      school.teachers.push(teacherId);
      const updatedSchool = await schoolService.updateSchool(schoolId, school);
      return updatedSchool;
    },
  },
};

export default schoolResolvers;
