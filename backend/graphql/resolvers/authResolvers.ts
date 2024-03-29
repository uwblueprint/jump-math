import type { CookieOptions, Request, Response } from "express";

import nodemailerConfig from "../../nodemailer.config";
import AuthService from "../../services/implementations/authService";
import EmailService from "../../services/implementations/emailService";
import SchoolService from "../../services/implementations/schoolService";
import UserService from "../../services/implementations/userService";
import type IAuthService from "../../services/interfaces/authService";
import type IEmailService from "../../services/interfaces/emailService";
import type { ISchoolService } from "../../services/interfaces/schoolService";
import type IUserService from "../../services/interfaces/userService";
import type { AuthDTO, RegisterTeacherDTO } from "../../types";

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);
const schoolService: ISchoolService = new SchoolService(userService);

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: process.env.PREVIEW_DEPLOY ? "none" : "strict",
  secure: process.env.NODE_ENV === "production",
};

const authResolvers = {
  Query: {
    verifyPasswordResetCode: async (
      _parent: undefined,
      { oobCode }: { oobCode: string },
    ): Promise<string> => {
      const email = await authService.verifyPasswordResetCode(oobCode);
      return email;
    },
  },
  Mutation: {
    login: async (
      _parent: undefined,
      { email, password }: { email: string; password: string },
      { res }: { res: Response },
    ): Promise<Omit<AuthDTO, "refreshToken"> & { emailVerified: boolean }> => {
      const authDTO = await authService.generateToken(email, password);
      const { refreshToken, ...rest } = authDTO;
      const emailVerified: boolean = await authService.isAuthorizedByEmail(
        authDTO.accessToken,
        email,
      );
      if (emailVerified) {
        res.cookie("refreshToken", refreshToken, cookieOptions);
      }
      return { emailVerified, ...rest };
    },
    registerTeacher: async (
      _parent: undefined,
      { user }: { user: RegisterTeacherDTO },
      { res }: { res: Response },
    ): Promise<Omit<AuthDTO, "refreshToken">> => {
      const createdUser = await userService.createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "Teacher",
        password: user.password,
        grades: user.grades,
        currentlyTeachingJM: user.currentlyTeachingJM,
      });

      if (user.school.id) {
        const school = await schoolService.getSchoolById(user.school.id);
        const teacherIds = [...school.teachers, createdUser.id];
        await schoolService.updateSchool(school.id, {
          ...school,
          teachers: teacherIds,
        });
      } else {
        await schoolService.createSchool({
          name: user.school.name,
          country: user.school.country,
          subRegion: user.school.district,
          city: user.school.city,
          address: user.school.address,
          teachers: [createdUser.id],
        });
      }

      const authDTO = await authService.generateToken(
        user.email,
        user.password,
      );
      const { refreshToken, ...rest } = authDTO;
      await authService.sendEmailVerificationLink(user.email);
      res.cookie("refreshToken", refreshToken, cookieOptions);
      return rest;
    },
    refresh: async (
      _parent: undefined,
      _args: Record<string, undefined>,
      { req, res }: { req: Request; res: Response },
    ): Promise<string> => {
      const token = await authService.renewToken(req.cookies.refreshToken);
      res.cookie("refreshToken", token.refreshToken, cookieOptions);
      return token.accessToken;
    },
    logout: async (
      _parent: undefined,
      { userId }: { userId: string },
    ): Promise<void> => {
      await authService.revokeTokens(userId);
    },
    resetPassword: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<boolean> => {
      await authService.resetPassword(email);
      return true;
    },
    verifyEmail: async (
      _parent: undefined,
      { oobCode }: { oobCode: string },
    ): Promise<string> => {
      const email = await authService.verifyEmail(oobCode);
      return email;
    },
    confirmPasswordReset: async (
      _parent: undefined,
      { newPassword, oobCode }: { newPassword: string; oobCode: string },
    ): Promise<boolean> => {
      await authService.confirmPasswordReset(newPassword, oobCode);
      return true;
    },
    sendEmailVerificationLink: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<boolean> => {
      await authService.sendEmailVerificationLink(email);
      return true;
    },
  },
};

export default authResolvers;
