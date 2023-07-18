import type { StudentResponse } from "../APIClients/types/ClassClientTypes";

import { includesIgnoreCase } from "./GeneralUtils";

export const filterStudentsBySearch = (
  students: StudentResponse[],
  search: string,
): StudentResponse[] =>
  search
    ? students.filter(
        (student: StudentResponse) =>
          includesIgnoreCase(student.firstName, search) ||
          includesIgnoreCase(student.lastName, search) ||
          (student.studentNumber &&
            includesIgnoreCase(student.studentNumber?.toString(), search)),
      )
    : students;
