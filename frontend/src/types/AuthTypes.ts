export type Role = "Admin" | "Teacher" | "Student";

export enum TabEnum {
  ADMIN,
  TEACHER,
}

export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  accessToken: string;
} | null;

export type AuthenticatedStudent = {
  testId: string;
  studentId: string;
} | null;

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
