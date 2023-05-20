export type Role = "Admin" | "Teacher" | "Student";

export enum TabEnum {
  ADMIN,
  TEACHER,
}

export enum TabEnumClassroom {
  ACTIVE,
  ARCHIVED,
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

export type VerifiableUser = AuthenticatedUser & { emailVerified: boolean };

export type DecodedJWT = {
  payload: {
    exp?: number;
  };
};
