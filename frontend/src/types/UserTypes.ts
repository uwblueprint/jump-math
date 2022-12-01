import { Role } from "./AuthTypes";

export type AdminUser = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AddUserRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
};

export type AddUserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};
