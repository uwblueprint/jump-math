import type { Role } from "../../types/AuthTypes";

export enum Grade {
  K = "K",
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  GRADE_3 = "GRADE_3",
  GRADE_4 = "GRADE_4",
  GRADE_5 = "GRADE_5",
  GRADE_6 = "GRADE_6",
  GRADE_7 = "GRADE_7",
  GRADE_8 = "GRADE_8",
}

export type UserRequest = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
  grades?: Grade[];
  currentlyTeachingJM?: boolean;
  class?: string[];
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
