import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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
  grades: number[];
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
  register: UseFormRegister<TeacherSignupForm>;
  handleSubmitCallback: () => void;
  watch: UseFormWatch<TeacherSignupForm>;
  setValue: UseFormSetValue<TeacherSignupForm>;
  errors: Partial<FieldErrorsImpl<TeacherSignupForm>>;
}
