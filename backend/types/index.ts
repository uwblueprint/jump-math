import type { QueryOptions as MongooseQueryOptions } from "mongoose";

export type QueryOptions = Pick<
  MongooseQueryOptions,
  "skip" | "sort" | "limit"
>;

export type Role = "Teacher" | "Admin";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export enum Grade {
  KINDERGARTEN = "K",
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  GRADE_3 = "GRADE_3",
  GRADE_4 = "GRADE_4",
  GRADE_5 = "GRADE_5",
  GRADE_6 = "GRADE_6",
  GRADE_7 = "GRADE_7",
  GRADE_8 = "GRADE_8",
}

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  grades?: Grade[];
  currentlyTeachingJM?: boolean;
  class?: string[];
};

export type TeacherDTO = UserDTO & { school: string };

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export interface SchoolMetadata {
  name: string;
  id: string;
  country: string;
  city: string;
  district: string;
  address: string;
}

export type RegisterTeacherDTO = RegisterUserDTO & {
  school: SchoolMetadata;
};

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};
