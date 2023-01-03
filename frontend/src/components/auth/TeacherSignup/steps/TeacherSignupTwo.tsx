import { useQuery } from "@apollo/client";
import { Button, VStack, Text, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { GET_SCHOOLS } from "../../../../APIClients/queries/SchoolQueries";
import { SchoolResponse } from "../../../../APIClients/types/SchoolClientTypes";
import SelectFormInput from "../SelectFormInput";
import { TeacherSignupForm, TeacherSignupProps } from "../types";
import FormError from "../../FormError";
import NavigationButtons from "../NavigationButtons";

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

  return (
    <VStack>
      <Text textStyle="header4" textAlign="center" pb={4}>
        Teacher Sign Up
      </Text>
      <Text
        textStyle="subtitle2"
        textAlign="center"
        pb={isCurrentlyTeachingJMError || isSchoolError ? 0 : 14}
      >
        Enter your credentials below to get access to your classes
      </Text>
      {(isCurrentlyTeachingJMError || isSchoolError) && (
        <FormError message="Please ensure fields are filled" />
      )}
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

      <Text textStyle="subtitle2" color="grey.400" pb="2em">
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
    </VStack>
  );
};

export default TeacherSignupTwo;
