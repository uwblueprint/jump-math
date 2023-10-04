import nodemailerConfig from "../../nodemailer.config";
import AuthService from "../../services/implementations/authService";
import EmailService from "../../services/implementations/emailService";
import UserService from "../../services/implementations/userService";
import type IAuthService from "../../services/interfaces/authService";
import type IEmailService from "../../services/interfaces/emailService";
import type IUserService from "../../services/interfaces/userService";
import type { CreateUserDTO, UserDTO, TeacherDTO } from "../../types";

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

const userResolvers = {
  Query: {
    userVerificationStatus: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<UserDTO> => {
      return userService.getUserById(id);
    },
    userByEmail: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<UserDTO> => {
      return userService.getUserByEmail(email);
    },
    usersByRole: async (
      _parent: undefined,
      { role }: { role: string },
    ): Promise<UserDTO[]> => {
      return userService.getUsersByRole(role);
    },
    teachers: async (): Promise<TeacherDTO[]> => {
      return userService.getAllTeachers();
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      { user }: { user: CreateUserDTO },
    ): Promise<UserDTO> => {
      const newUser = await userService.createUser(user);
      await authService.sendEmailVerificationLink(newUser.email);
      return newUser;
    },
    deleteUserByEmail: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<void> => {
      return userService.deleteUserByEmail(email);
    },
  },
};

export default userResolvers;
