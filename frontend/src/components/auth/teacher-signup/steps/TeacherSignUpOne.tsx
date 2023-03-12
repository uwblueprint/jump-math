import React from "react";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  useCheckboxGroup,
} from "@chakra-ui/react";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import { TEACHER_LOGIN } from "../../../../constants/Routes";
import {
  TeacherInput,
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import NavigationButtons from "../NavigationButtons";

const TeacherSignupOne = ({
  setPage,
}: TeacherSignupProps): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherSignupForm>();
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [gradesError, setGradesError] = React.useState(false);
  const history = useHistory();

  const { value: gradesValues, setValue: setGradesValue } = useCheckboxGroup({
    defaultValue: watch("grades") || [],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: TeacherInput,
  ) => {
    setValue(field, event.target.value);

    switch (field) {
      case "firstName":
        setFirstNameError(false);
        break;
      case "lastName":
        setLastNameError(false);
        break;
      case "email":
        setEmailError(false);
        break;
      case "grades":
        setGradesError(false);
        break;
      default:
        break;
    }
  };

  const onChangeGrades = (values: string[]) => {
    setValue("grades", values);
    setGradesValue(values);
    setGradesError(false);
  };

  const validateFields = (): boolean => {
    if (!watch("firstName") || !!errors.firstName) {
      setFirstNameError(true);
      return false;
    }

    if (!watch("lastName") || !!errors.lastName) {
      setLastNameError(true);
      return false;
    }

    if (!watch("email") || !!errors.email) {
      setEmailError(true);
      return false;
    }

    if (!watch("grades.0") || !!errors.grades) {
      setGradesError(true);
      return false;
    }

    return true;
  };

  const onContinueClick = () => {
    if (validateFields()) setPage(2);
  };

  const title = "Teacher Sign Up";
  const subtitle = "Enter your credentials below to get access to your classes";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <>
      <Stack alignItems="flex-end" direction={["row"]} width="100%">
        <FormControl isInvalid={firstNameError} isRequired>
          <FormLabel color="grey.400">Name</FormLabel>
          <Input
            onChange={(e) => handleChange(e, "firstName")}
            placeholder="First"
            type="text"
            value={watch("firstName")}
          />
        </FormControl>
        <FormControl isInvalid={lastNameError}>
          <Input
            onChange={(e) => handleChange(e, "lastName")}
            placeholder="Last"
            type="text"
            value={watch("lastName")}
          />
        </FormControl>
      </Stack>

      <FormControl isInvalid={emailError} isRequired>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input
          onChange={(e) => handleChange(e, "email")}
          placeholder="Enter Email Address"
          type="email"
          value={watch("email")}
        />
      </FormControl>

      <FormControl isInvalid={gradesError} isRequired>
        <FormLabel color="grey.400">What grades do you teach?</FormLabel>
        <CheckboxGroup onChange={onChangeGrades} value={gradesValues}>
          <SimpleGrid columns={3}>
            {[
              "K",
              "Grade 3",
              "Grade 6",
              "Grade 1",
              "Grade 4",
              "Grade 7",
              "Grade 2",
              "Grade 5",
              "Grade 8",
            ].map((grade) => (
              <Checkbox key={grade} value={grade}>
                {grade}
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>
      </FormControl>

      <NavigationButtons
        backButtonText="Back to login page"
        onBackClick={() => history.push(TEACHER_LOGIN)}
        onContinueClick={onContinueClick}
      />
    </>
  );
  const error =
    firstNameError || lastNameError || emailError || gradesError
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

export default TeacherSignupOne;
