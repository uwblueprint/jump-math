import type { ChangeEvent, ReactElement } from "react";
import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import countryList from "react-select-country-list";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import { TEACHER_SIGNUP_IMAGE } from "../../../../assets/images";
import type {
  TeacherInput,
  TeacherSignupForm,
  TeacherSignupProps,
} from "../../../../types/TeacherSignupTypes";
import ControlledSelect from "../../../common/form/ControlledSelect";
import AuthWrapper from "../../AuthWrapper";
import NavigationButtons from "../NavigationButtons";

const TeacherSignupThree = ({ setPage }: TeacherSignupProps): ReactElement => {
  const {
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherSignupForm>();
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: TeacherInput,
  ) => {
    setValue(field, event.target.value);

    switch (field) {
      case "school.name":
        setSchoolNameError(false);
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

  const validateFields = async (): Promise<boolean> => {
    let isValid = true;

    if (!watch("school.name") || !!errors.school?.name) {
      setSchoolNameError(true);
      isValid = false;
    }

    if (!(await trigger("school.country"))) {
      isValid = false;
    }

    if (!watch("school.city") || !!errors.school?.city) {
      setCityError(true);
      isValid = false;
    }

    if (!watch("school.district") || !!errors.school?.district) {
      setDistrictError(true);
      isValid = false;
    }

    if (!watch("school.address") || !!errors.school?.address) {
      setAddressError(true);
      isValid = false;
    }
    return isValid;
  };

  const onContinueClick = async () => {
    if (await validateFields()) setPage(4);
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
        <FormControl isInvalid={!!errors.school?.country} isRequired>
          <FormLabel color="grey.400">Country</FormLabel>
          <ControlledSelect
            isRequired
            isSearchable
            name="school.country"
            options={countryOptions}
            placeholder="Select Country"
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
    !!errors.school?.country ||
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
