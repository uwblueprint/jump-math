import type { StudentResponseDTO } from "../services/interfaces/classService";
import type {
  TestSessionResponseDTO,
  ResultResponseDTO,
} from "../services/interfaces/testSessionService";

export type TestSessionAndStudentResponseDTO = Omit<
  TestSessionResponseDTO,
  "results"
> & {
  results: ResultAndStudentResponseDTO[];
};

export type ResultAndStudentResponseDTO = Omit<ResultResponseDTO, "student"> & {
  student: StudentResponseDTO;
};
