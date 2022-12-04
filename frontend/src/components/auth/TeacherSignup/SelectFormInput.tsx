/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Select } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { TeacherSignupForm } from "./types";

type TeacherInput =
  | "firstName"
  | "lastName"
  | "email"
  | "grades"
  | "currentlyTeachingJM"
  | "school"
  | "newSchoolName"
  | "newSchoolCountry"
  | "newSchoolCity"
  | "newSchoolDistrict"
  | "newSchoolAddress"
  | "password"
  | `grades.${number}`;

interface SelectFormInputProps {
  register: UseFormRegister<TeacherSignupForm>;
  name: TeacherInput;
  options: string[];
  placeholder: string;
  required: boolean;
}

const SelectFormInput = ({
  register,
  name,
  options,
  placeholder,
  required,
}: SelectFormInputProps): React.ReactElement => {
  return (
    <Select
      {...register(name, { required })}
      variant="filled"
      placeholder={placeholder}
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export default SelectFormInput;
