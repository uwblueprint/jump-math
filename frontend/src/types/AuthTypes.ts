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

type AuthenticatedAdminOrTeacher = BaseUser & {
  email: string;
  accessToken: string;
};

type AuthenticatedStudent = BaseUser & {
  studentNumber?: string;
  testId: string;
};

export type AuthenticatedUser =
  | AuthenticatedAdminOrTeacher
  | AuthenticatedStudent
  | null;

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
