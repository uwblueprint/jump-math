// import ClassService from "../../services/implementations/classService";
// import {
//   IClassService,
//   ClassRequestDTO,
//   ClassResponseDTO,
// } from "../../services/interfaces/classService";
// import UserService from "../../services/implementations/userService";
// import IUserService from "../../services/interfaces/userService";
// import { ITestSessionService } from "../../services/interfaces/testSessionService";
// import TestSessionService from "../../services/implementations/testSessionService";

// const userService: IUserService = new UserService();
// const testSessionService: ITestSessionService = new TestSessionService();

// const classResolvers = {
//   Query: {
//     class: async (
//       _parent: undefined,
//       { id }: { id: string },
//     ): Promise<ClassResponseDTO> => {
//       return classService.getClassById(id);
//     },
//   },
//   Mutation: {
//     createClass: async (
//         _req: undefined,
//         { class }: { class: ClassRequestDTO },
//       ): Promise<ClassResponseDTO> => {
//         const newClass = await classService.createClass({ ...class });
//         return newClass;
//       },
//   }
// };

// export default classResolvers;
