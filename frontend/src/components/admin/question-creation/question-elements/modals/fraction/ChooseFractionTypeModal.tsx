import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import type { FractionType } from "../../../../../../types/QuestionTypes";
import FractionInput from "../../../../../common/fraction/FractionInput";
import Modal from "../../../../../common/modal/Modal";

interface ChooseFractionTypeModalProps {
  fractionType: FractionType;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  setFractionType: (val: FractionType) => void;
}

interface FractionTypeOptionsType {
  label: string;
  value: FractionType;
  wholeNumber: string | null;
}

const options: FractionTypeOptionsType[] = [
  {
    label: "Regular",
    value: "regular",
    wholeNumber: null,
  },
  {
    label: "Mixed",
    value: "mixed",
    wholeNumber: "",
  },
];

const ChooseFractionTypeModal = ({
  fractionType,
  isOpen,
  onClose,
  onNext,
  setFractionType,
}: ChooseFractionTypeModalProps): React.ReactElement => {
  return (
    <Modal
      header="Create fraction question"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onNext}
      submitButtonText="Next"
    >
      <FormControl isRequired>
        <FormLabel color="grey.400" style={{ fontSize: "18px" }}>
          Choose the format you want to use below
        </FormLabel>
        <RadioGroup
          defaultValue={fractionType}
          onChange={(val: FractionType) => setFractionType(val)}
        >
          <Stack>
            {options.map((option: FractionTypeOptionsType, i) => {
              return (
                <Radio key={i} value={option.value} variant="fullWidthLabel">
                  <FormHelperText
                    color="grey.300"
                    pb="1em"
                    style={{ fontSize: "18px" }}
                  >
                    {option.label}
                  </FormHelperText>
                  <FractionInput
                    denominator=""
                    numerator=""
                    readOnly
                    wholeNumber={option.wholeNumber}
                  />
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
        <FormErrorMessage>Select a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default ChooseFractionTypeModal;
