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
import ControlledSelect from "../../../common/form/ControlledSelect";
import AuthWrapper from "../../AuthWrapper";
import NavigationButtons from "../NavigationButtons";

const TeacherSignupTwo = ({
  setPage,
}: TeacherSignupProps): React.ReactElement => {
  const {
    trigger,
    formState: { errors },
  } = useFormContext<TeacherSignupForm>();
  const [schools, setSchools] = React.useState<SchoolResponse[]>([]);

  useQuery(GET_ALL_SCHOOLS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setSchools(data.schools.map((school: SchoolResponse) => school));
    },
  });

  const areFieldsValid = async (fields: Parameters<typeof trigger>[0]) => {
    return trigger(fields, { shouldFocus: true });
  };

  const onNewSchoolClick = async () => {
    if (await areFieldsValid("currentlyTeachingJM")) setPage(3);
  };

  const onContinueClick = async () => {
    if (await areFieldsValid(["currentlyTeachingJM", "school.id"])) setPage(4);
  };

  const title = "Teacher Sign Up";
  const subtitle = "Enter your credentials below to get access to your classes";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      <FormControl isInvalid={!!errors.currentlyTeachingJM} isRequired>
        <FormLabel color="grey.400">
          Are you currently teaching Jump Math in the classroom?
        </FormLabel>
        <ControlledSelect
          isRequired
          isSearchable={false}
          name="currentlyTeachingJM"
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
          placeholder="Select response"
        />
      </FormControl>

      <FormControl isInvalid={!!errors.school?.id} isRequired>
        <FormLabel color="grey.400">School</FormLabel>
        <ControlledSelect
          isRequired
          isSearchable
          name="school.id"
          options={schools.map((school) => ({
            value: school.id,
            label: school.name,
          }))}
          placeholder="Search for a school"
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
    !!errors.currentlyTeachingJM || !!errors.school?.id
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
