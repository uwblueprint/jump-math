import { Grade, UserResponse } from "./UserClientTypes";

export type ClassRequest = {
  className: string;
  schoolYear: number;
  gradeLevel: Grade;
  teacher: string;
};

export type ClassResponse = {
  id: string;
  className: string;
  schoolYear: number;
  gradeLevel: Grade;
  teacher: UserResponse;
};
