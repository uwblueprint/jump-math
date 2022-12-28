import { Role } from "../../types/AuthTypes";

export type UserRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};
