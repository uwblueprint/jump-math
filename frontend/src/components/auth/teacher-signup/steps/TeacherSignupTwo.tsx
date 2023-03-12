import React from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Text } from "@chakra-ui/react";

import { GET_SCHOOLS } from "../../../../APIClients/queries/SchoolQueries";
import { SchoolResponse } from "../../../../APIClients/types/SchoolClientTypes";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import {
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
  const [
    isCurrentlyTeachingJMError,
    setIsCurrentlyTeachingJMError,
  ] = React.useState(false);
  const [isSchoolError, setSchoolError] = React.useState(false);

  useQuery(GET_SCHOOLS, {
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
          Are you currently teaching Jump Math in the classroom?
        </FormLabel>
        <SelectFormInput
          setValue={setValue}
          watch={watch}
          field="currentlyTeachingJM"
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
          isSearchable={false}
        />
      </FormControl>

      <FormControl isInvalid={isSchoolError} isRequired>
        <FormLabel color="grey.400">School</FormLabel>
        <SelectFormInput
          setValue={setValue}
          watch={watch}
          field="school.id"
          options={schools.map((school) => ({
            value: school.id,
            label: school.name,
          }))}
          placeholder="Search School by typing it in field"
          resetError={setSchoolError}
          isSearchable
        />
      </FormControl>

      <Text textStyle="subtitle2" color="grey.400" pb="1em">
        If your school is not listed,{" "}
        <Button
          onClick={onNewSchoolClick}
          display="contents"
          color="blue.300"
          style={{ font: "inherit" }}
        >
          click here.
        </Button>
      </Text>

      <NavigationButtons
        onContinueClick={onContinueClick}
        onBackClick={() => setPage(1)}
      />
    </>
  );
  const error =
    isCurrentlyTeachingJMError || isSchoolError
      ? "Please ensure fields are filled"
      : "";

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      image={image}
      form={form}
      error={error}
    />
  );
};

export default TeacherSignupTwo;
