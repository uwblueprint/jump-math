import type { Grade } from "../APIClients/types/UserClientTypes";

export type TeacherInput =
  | "firstName"
  | "lastName"
  | "email"
  | "grades"
  | "currentlyTeachingJM"
  | "school"
  | "password"
  | `grades.${number}`
  | "school.name"
  | "school.id"
  | "school.country"
  | "school.city"
  | "school.district"
  | "school.address";

export interface TeacherSignupForm {
  firstName: string;
  lastName: string;
  email: string;
  grades: Grade[];
  currentlyTeachingJM: boolean | null;
  school: SchoolMetadata;
  password: string;
}

export interface SchoolMetadata {
  name: string;
  id: string;
  country: string;
  city: string;
  district: string;
  address: string;
}

export interface TeacherSignupProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleSubmitCallback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  error: string;
}
