import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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
  handleSubmit: UseFormHandleSubmit<TeacherSignupForm>;
  watch: UseFormWatch<TeacherSignupForm>;
  setValue: UseFormSetValue<TeacherSignupForm>;
  errors: Partial<FieldErrorsImpl<TeacherSignupForm>>;
}
