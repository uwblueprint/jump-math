import { VStack, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import countryList from "react-select-country-list";

import NavigationButtons from "../NavigationButtons";
import SelectFormInput from "../SelectFormInput";
import { TeacherInput, TeacherSignupForm, TeacherSignupProps } from "../types";
import AuthWrapper from "../../AuthWrapper";
import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";

const TeacherSignupThree = ({
  setPage,
}: TeacherSignupProps): React.ReactElement => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherSignupForm>();
  const [schoolNameError, setSchoolNameError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);
  const [cityError, setCityError] = React.useState(false);
  const [districtError, setDistrictError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);

  const countryOptions = React.useMemo(() => countryList().getData(), []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: TeacherInput,
  ) => {
    setValue(field, event.target.value);

    switch (field) {
      case "school.name":
        setSchoolNameError(false);
        break;
      case "school.country":
        setCountryError(false);
        break;
      case "school.city":
        setCityError(false);
        break;
      case "school.district":
        setDistrictError(false);
        break;
      case "school.address":
        setAddressError(false);
        break;
      default:
        break;
    }
  };

  const validateFields = (): boolean => {
    if (!watch("school.name") || !!errors.school?.name) {
      setSchoolNameError(true);
      return false;
    }

    if (!watch("school.country") || !!errors.school?.country) {
      setCountryError(true);
      return false;
    }

    if (!watch("school.city") || !!errors.school?.city) {
      setCityError(true);
      return false;
    }

    if (!watch("school.district") || !!errors.school?.district) {
      setDistrictError(true);
      return false;
    }

    if (!watch("school.address") || !!errors.school?.address) {
      setAddressError(true);
      return false;
    }

    return true;
  };

  const onContinueClick = () => {
    if (validateFields()) setPage(4);
  };

  const title = "Teacher Sign Up";
  const subtitle = "Enter your credentials below to get access to your classes";
  const image = TEACHER_SIGNUP_IMAGE;
  const form = (
    <VStack>
      <FormControl isInvalid={schoolNameError} isRequired>
        <FormLabel color="grey.400">Name of School</FormLabel>
        <Input
          type="text"
          value={watch("school.name")}
          placeholder="Name of School"
          onChange={(e) => handleChange(e, "school.name")}
        />
      </FormControl>

      <Stack direction={["row"]} width="100%">
        <FormControl pt={4} isInvalid={countryError} isRequired>
          <FormLabel color="grey.400">Country</FormLabel>
          <SelectFormInput
            setValue={setValue}
            watch={watch}
            field="school.country"
            options={countryOptions}
            placeholder="Select Country"
            resetError={setCountryError}
            isSearchable
          />
        </FormControl>
        <FormControl pt={4} isInvalid={cityError} isRequired>
          <FormLabel color="grey.400">City</FormLabel>
          <Input
            type="text"
            value={watch("school.city")}
            placeholder="Enter City"
            onChange={(e) => handleChange(e, "school.city")}
          />
        </FormControl>
      </Stack>

      <Stack direction={["row"]} width="100%" pb={8}>
        <FormControl pt={2} isInvalid={districtError} isRequired>
          <FormLabel color="grey.400">District</FormLabel>
          <Input
            type="text"
            value={watch("school.district")}
            placeholder="Name of District"
            onChange={(e) => handleChange(e, "school.district")}
          />
        </FormControl>
        <FormControl pt={2} isInvalid={addressError} isRequired>
          <FormLabel color="grey.400">Address</FormLabel>
          <Input
            type="text"
            value={watch("school.address")}
            placeholder="Enter Address"
            onChange={(e) => handleChange(e, "school.address")}
          />
        </FormControl>
      </Stack>

      <NavigationButtons
        onContinueClick={onContinueClick}
        onBackClick={() => setPage(2)}
      />
    </VStack>
  );
  const error =
    schoolNameError ||
    countryError ||
    cityError ||
    districtError ||
    addressError
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

export default TeacherSignupThree;
