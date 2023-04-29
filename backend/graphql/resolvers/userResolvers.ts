import nodemailerConfig from "../../nodemailer.config";
import AuthService from "../../services/implementations/authService";
import ClassService from "../../services/implementations/classService";
import EmailService from "../../services/implementations/emailService";
import SchoolService from "../../services/implementations/schoolService";
import TestService from "../../services/implementations/testService";
import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import IAuthService from "../../services/interfaces/authService";
import { IClassService } from "../../services/interfaces/classService";
import IEmailService from "../../services/interfaces/emailService";
import { ISchoolService } from "../../services/interfaces/schoolService";
import { ITestService } from "../../services/interfaces/testService";
import { ITestSessionService } from "../../services/interfaces/testSessionService";
import IUserService from "../../services/interfaces/userService";
import { CreateUserDTO, UpdateUserDTO, UserDTO, TeacherDTO } from "../../types";
import { generateCSV } from "../../utilities/CSVUtils";

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

const userResolvers = {
  Query: {
    userById: async (
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
    users: async (): Promise<UserDTO[]> => {
      return userService.getUsers();
    },
    usersByRole: async (
      _parent: undefined,
      { role }: { role: string },
    ): Promise<UserDTO[]> => {
      return userService.getUsersByRole(role);
    },
    usersCSV: async (): Promise<string> => {
      const users = await userService.getUsers();
      const csv = await generateCSV<UserDTO>({ data: users });
      return csv;
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
    updateUser: async (
      _parent: undefined,
      { id, user }: { id: string; user: UpdateUserDTO },
    ): Promise<UserDTO> => {
      return userService.updateUserById(id, user);
    },
    deleteUserById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<void> => {
      return userService.deleteUserById(id);
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
