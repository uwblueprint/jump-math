export type Role = "Admin" | "Teacher";

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

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
