export type Role = "Admin" | "Teacher" | "Student";

export enum TabEnum {
  ADMIN,
  TEACHER,
}

type BaseUser = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type AuthenticatedAdminOrTeacher = BaseUser & {
  email: string;
  accessToken: string;
};

type AuthenticatedStudent = BaseUser & {
  studentNumber?: string;
};

export type AuthenticatedUser =
  | AuthenticatedAdminOrTeacher
  | AuthenticatedStudent
  | null;

export type AuthenticatedStudent = {
  testId: string;
  studentId: string;
} | null;

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
