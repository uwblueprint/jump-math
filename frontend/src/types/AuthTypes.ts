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

export type AuthenticatedAdmin = BaseUser & {
  email: string;
  accessToken: string;
};

export type AuthenticatedTeacher = BaseUser & {
  email: string;
  accessToken: string;
  school: string;
};

type AuthenticatedStudent = BaseUser & {
  studentNumber?: string;
};

export type AuthenticatedUser =
  | AuthenticatedAdmin
  | AuthenticatedTeacher
  | AuthenticatedStudent
  | null;

export type VerifiableUser = AuthenticatedUser & { emailVerified: boolean };

export type DecodedJWT = {
  payload: {
    exp?: number;
  };
};
