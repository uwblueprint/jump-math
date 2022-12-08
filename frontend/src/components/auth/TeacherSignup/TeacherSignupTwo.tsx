import { useQuery } from "@apollo/client";
import { Button, VStack, Text, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import GET_SCHOOLS from "../../../APIClients/queries/SchoolQueries";
import { SchoolResponse } from "../../../types/SchoolTypes";
import { ArrowBackOutlineIcon } from "../../common/icons";
import SelectFormInput from "./SelectFormInput";
import { TeacherSignupProps } from "./types";
import ErrorMessage from "./ErrorMessage";

const TeacherSignupTwo = ({
  setPage,
  watch,
  setValue,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  const [schools, setSchools] = React.useState<SchoolResponse[]>([]);
  const [errorMessage, setErrorMessage] = React.useState(false);

  useQuery(GET_SCHOOLS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setSchools(data.schools.map((school: SchoolResponse) => school));
    },
  });

  const onContinueClick = () => {
    if (
      !!watch("currentlyTeachingJM") &&
      !!watch("school") &&
      !errors.currentlyTeachingJM &&
      !errors.school
    ) {
      setPage(4);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center" pb={3}>
        Enter your credentials below to get access to your classes
      </Text>
      {errorMessage && (
        <ErrorMessage message="Please ensure fields are filled" />
      )}
      <FormControl
        pt={10}
        isInvalid={!!watch("currentlyTeachingJM")}
        isRequired
      >
        <FormLabel color="grey.400">
          Are you currently teaching Jump Math in the classroom?
        </FormLabel>
        <SelectFormInput
          setValue={setValue}
          name="currentlyTeachingJM"
          options={["Yes", "No"].map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Response"
          isSearchable={false}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel color="grey.400">School</FormLabel>
        <SelectFormInput
          setValue={setValue}
          name="school"
          options={schools.map((school) => ({
            value: school.id,
            label: school.name,
          }))}
          placeholder="Search School by typing it in field"
          isSearchable
        />
      </FormControl>

      <Text textStyle="subtitle2" color="grey.400" pb="2em">
        If your school is not listed,{" "}
        <Button
          onClick={() => setPage(3)}
          display="contents"
          color="blue.300"
          style={{ font: "inherit" }}
        >
          click here.
        </Button>
      </Text>

      <Button variant="primary" width="100%" onClick={onContinueClick}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={() => setPage(1)}
      >
        Back
      </Button>
    </VStack>
  );
};

export default TeacherSignupTwo;
