import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface TeacherSignupForm {
  firstName: string;
  lastName: string;
  email: string;
  grades: number[];
  currentlyTeachingJM: boolean;
  school: string;
  newSchoolName: string;
  newSchoolCountry: string;
  newSchoolCity: string;
  newSchoolDistrict: string;
  newSchoolAddress: string;
  password: string;
}

export interface TeacherSignupProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<TeacherSignupForm>;
  handleSubmit: UseFormHandleSubmit<TeacherSignupForm>;
  errors: Partial<FieldErrorsImpl<TeacherSignupForm>>;
}
