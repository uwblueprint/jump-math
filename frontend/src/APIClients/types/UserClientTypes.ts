import { Role } from "../../types/AuthTypes";

export enum Grade {
  K = "K",
  GRADE_1 = "1",
  GRADE_2 = "2",
  GRADE_3 = "3",
  GRADE_4 = "4",
  GRADE_5 = "5",
  GRADE_6 = "6",
  GRADE_7 = "7",
  GRADE_8 = "8",
}

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
