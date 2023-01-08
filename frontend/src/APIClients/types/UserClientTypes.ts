import { Role } from "../../types/AuthTypes";

export type Grade =
  | "K"
  | "Grade 1"
  | "Grade 2"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8";

export type UserRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
  grades?: Grade[];
  currentlyTeachingJM?: boolean;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  grades?: Grade[];
  currentlyTeachingJM?: boolean;
};
