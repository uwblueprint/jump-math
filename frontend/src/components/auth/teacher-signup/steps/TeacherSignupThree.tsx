import React from "react";
import { useFormContext } from "react-hook-form";
import countryList from "react-select-country-list";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import {
  TeacherInput,
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import AuthWrapper from "../../AuthWrapper";
import NavigationButtons from "../NavigationButtons";
import SelectFormInput from "../SelectFormInput";

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
    <>
      <FormControl isInvalid={schoolNameError} isRequired>
        <FormLabel color="grey.400">Name of School</FormLabel>
        <Input
          onChange={(e) => handleChange(e, "school.name")}
          placeholder="Name of School"
          type="text"
          value={watch("school.name")}
        />
      </FormControl>

      <Stack direction={["row"]} width="100%">
        <FormControl isInvalid={countryError} isRequired>
          <FormLabel color="grey.400">Country</FormLabel>
          <SelectFormInput
            field="school.country"
            isSearchable
            options={countryOptions}
            placeholder="Select Country"
            resetError={setCountryError}
            setValue={setValue}
            watch={watch}
          />
        </FormControl>
        <FormControl isInvalid={cityError} isRequired>
          <FormLabel color="grey.400">City</FormLabel>
          <Input
            onChange={(e) => handleChange(e, "school.city")}
            placeholder="Enter City"
            type="text"
            value={watch("school.city")}
          />
        </FormControl>
      </Stack>

      <Stack direction={["row"]} pb={8} width="100%">
        <FormControl isInvalid={districtError} isRequired>
          <FormLabel color="grey.400">District</FormLabel>
          <Input
            onChange={(e) => handleChange(e, "school.district")}
            placeholder="Name of District"
            type="text"
            value={watch("school.district")}
          />
        </FormControl>
        <FormControl isInvalid={addressError} isRequired>
          <FormLabel color="grey.400">Address</FormLabel>
          <Input
            onChange={(e) => handleChange(e, "school.address")}
            placeholder="Enter Address"
            type="text"
            value={watch("school.address")}
          />
        </FormControl>
      </Stack>

      <NavigationButtons
        onBackClick={() => setPage(2)}
        onContinueClick={onContinueClick}
      />
    </>
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
      error={error}
      form={form}
      image={image}
      subtitle={subtitle}
      title={title}
    />
  );
};

export default TeacherSignupThree;
