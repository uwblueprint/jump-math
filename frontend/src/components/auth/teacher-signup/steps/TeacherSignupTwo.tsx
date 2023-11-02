import React from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Text } from "@chakra-ui/react";

import { GET_ALL_SCHOOLS } from "../../../../APIClients/queries/SchoolQueries";
import type { SchoolResponse } from "../../../../APIClients/types/SchoolClientTypes";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import type {
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import NavigationButtons from "../NavigationButtons";
import SelectFormInput from "../SelectFormInput";

const TeacherSignupTwo = ({
  setPage,
}: TeacherSignupProps): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherSignupForm>();
  const [schools, setSchools] = React.useState<SchoolResponse[]>([]);
  const [isCurrentlyTeachingJMError, setIsCurrentlyTeachingJMError] =
    React.useState(false);
  const [isSchoolError, setSchoolError] = React.useState(false);

  useQuery(GET_ALL_SCHOOLS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setSchools(data.schools.map((school: SchoolResponse) => school));
    },
  });

  const validateCurrentlyTeachingJM = (): boolean => {
    if (watch("currentlyTeachingJM") === null || !!errors.currentlyTeachingJM) {
      setIsCurrentlyTeachingJMError(true);
      return false;
    }
    return true;
  };

  const validateSchool = (): boolean => {
    if (!watch("school.id") || !!errors.school) {
      setSchoolError(true);
      return false;
    }
    return true;
  };

  const onNewSchoolClick = () => {
    if (validateCurrentlyTeachingJM()) setPage(3);
  };

  const onContinueClick = () => {
    const validSchool = validateSchool();
    if (validateCurrentlyTeachingJM() && validSchool) setPage(4);
  };

  const title = "Teacher Sign Up";
  const subtitle = "Enter your credentials below to get access to your classes";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      <FormControl isInvalid={isCurrentlyTeachingJMError} isRequired>
        <FormLabel color="grey.400">
          Are you currently teaching JUMP Math in the classroom?
        </FormLabel>
        <SelectFormInput
          field="currentlyTeachingJM"
          isSearchable={false}
          options={[
            {
              value: true,
              label: "Yes",
            },
            {
              value: false,
              label: "No",
            },
          ]}
          placeholder="Select Response"
          resetError={setIsCurrentlyTeachingJMError}
          setValue={setValue}
          watch={watch}
        />
      </FormControl>

      <FormControl isInvalid={isSchoolError} isRequired>
        <FormLabel color="grey.400">School</FormLabel>
        <SelectFormInput
          field="school.id"
          isSearchable
          options={schools.map((school) => ({
            value: school.id,
            label: school.name,
          }))}
          placeholder="Search School by typing it in field"
          resetError={setSchoolError}
          setValue={setValue}
          watch={watch}
        />
      </FormControl>

      <Text color="grey.400" pb="1em" textStyle="subtitle2">
        If your school is not listed,{" "}
        <Button
          color="blue.300"
          display="contents"
          onClick={onNewSchoolClick}
          style={{ font: "inherit" }}
        >
          click here.
        </Button>
      </Text>

      <NavigationButtons
        onBackClick={() => setPage(1)}
        onContinueClick={onContinueClick}
      />
    </>
  );
  const error =
    isCurrentlyTeachingJMError || isSchoolError
      ? "Please ensure fields are filled"
      : "";

  return (
    <AuthWrapper
      error={error}
      form={form}
      image={image}
      subtitle={subtitle}
      title={title}
    />
  );
};

export default TeacherSignupTwo;
