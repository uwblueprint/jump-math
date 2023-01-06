import {
  VStack,
  Stack,
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../../constants/Routes";
import NavigationButtons from "../NavigationButtons";
import { TeacherSignupForm, TeacherInput, TeacherSignupProps } from "../types";
import AuthWrapper from "../../AuthWrapper";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";

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
    <VStack>
      <Stack direction={["row"]} width="100%" alignItems="flex-end">
        <FormControl isInvalid={firstNameError} isRequired>
          <FormLabel color="grey.400">Name</FormLabel>
          <Input
            type="text"
            value={watch("firstName")}
            placeholder="First"
            onChange={(e) => handleChange(e, "firstName")}
          />
        </FormControl>
        <FormControl isInvalid={lastNameError}>
          <Input
            type="text"
            value={watch("lastName")}
            placeholder="Last"
            onChange={(e) => handleChange(e, "lastName")}
          />
        </FormControl>
      </Stack>

      <FormControl pt={4} isInvalid={emailError} isRequired>
        <FormLabel color="grey.400">Email Address</FormLabel>
        <Input
          type="email"
          value={watch("email")}
          placeholder="Enter Email Address"
          onChange={(e) => handleChange(e, "email")}
        />
      </FormControl>

      <FormControl pt={4} isInvalid={gradesError} isRequired>
        <FormLabel color="grey.400">What grades do you teach?</FormLabel>
        <CheckboxGroup value={gradesValues} onChange={onChangeGrades}>
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
        onContinueClick={onContinueClick}
        onBackClick={() => history.push(LOGIN_PAGE)}
        firstPage
      />
    </VStack>
  );
  const error =
    firstNameError || lastNameError || emailError || gradesError
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

export default TeacherSignupOne;
