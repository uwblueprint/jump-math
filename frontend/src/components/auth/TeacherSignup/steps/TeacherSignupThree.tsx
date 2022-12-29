import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import countryList from "react-select-country-list";
import ErrorMessage from "../ErrorMessage";
import NavigationButtons from "../NavigationButtons";
import SelectFormInput from "../SelectFormInput";
import { TeacherInput, TeacherSignupProps } from "../types";

const TeacherSignupThree = ({
  setPage,
  setValue,
  watch,
  errors,
}: TeacherSignupProps): React.ReactElement => {
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

  return (
    <VStack>
      <Text
        textStyle="subtitle2"
        textAlign="center"
        pb={
          schoolNameError ||
          countryError ||
          cityError ||
          districtError ||
          addressError
            ? 0
            : 14
        }
      >
        Enter your credentials below to get access to your classes
      </Text>
      {(schoolNameError ||
        countryError ||
        cityError ||
        districtError ||
        addressError) && (
        <ErrorMessage message="Please ensure fields are filled" />
      )}

      <FormControl pt={4} isInvalid={schoolNameError} isRequired>
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
        <FormControl pt={4} isInvalid={districtError} isRequired>
          <FormLabel color="grey.400">District</FormLabel>
          <Input
            type="text"
            value={watch("school.district")}
            placeholder="Name of District"
            onChange={(e) => handleChange(e, "school.district")}
          />
        </FormControl>
        <FormControl pt={4} isInvalid={addressError} isRequired>
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
};

export default TeacherSignupThree;
