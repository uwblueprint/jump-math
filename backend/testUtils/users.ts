import type { UserDTO } from "../types";
import { Grade } from "../types";

// set up test users to return from mock user service
export const mockAdmin: UserDTO = {
  id: "62c248c0f79d6c3c9ebbea94",
  firstName: "Admin",
  lastName: "One",
  email: "admin@gmail.com",
  role: "Admin",
};

export const mockTeacher: UserDTO = {
  id: "62c248c0f79d6c3c9ebbea91",
  firstName: "Teacher",
  lastName: "One",
  email: "teacher@gmail.com",
  role: "Teacher",
  grades: [Grade.KINDERGARTEN, Grade.GRADE_1, Grade.GRADE_2, Grade.GRADE_3],
  currentlyTeachingJM: true,
};

export const testUsers = [mockAdmin, mockTeacher];
