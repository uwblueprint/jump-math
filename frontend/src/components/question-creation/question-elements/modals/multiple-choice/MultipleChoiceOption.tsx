import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Spacer,
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { DeleteOutlineIcon } from "../../../../../assets/icons";
import { MultipleChoiceOptionData } from "../../../../../types/QuestionTypes";
import { updatedMultipleChoiceOption } from "../../../../../utils/QuestionUtils";

interface MultipleChoiceOptionProps {
  data: MultipleChoiceOptionData;
  isEmptyError: boolean;
  isCorrectError: boolean;
  setOptions: React.Dispatch<React.SetStateAction<MultipleChoiceOptionData[]>>;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
}

const MultipleChoiceOption = ({
  data,
  isEmptyError,
  isCorrectError,
  setOptions,
  setOptionCount,
}: MultipleChoiceOptionProps): React.ReactElement => {
  const { id, value, isCorrect } = data;
  const [lengthError, setLengthError] = useState(false);

  const isOversized = (input: string) => input.length > 800;
  const updateOptionValue = (updatedValue: string) => {
    setLengthError(isOversized(updatedValue));
    setOptions((prevOptions) => {
      return updatedMultipleChoiceOption(
        id,
        prevOptions,
        updatedValue,
        isCorrect,
      );
    });
  };

  const markOptionCorrect = (updatedIsCorrect: boolean) => {
    setOptions((prevOptions) => {
      return updatedMultipleChoiceOption(
        id,
        prevOptions,
        value,
        updatedIsCorrect,
      );
    });
  };

  const removeOption = () => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id),
    );
    setOptionCount((prevOptionCount) => prevOptionCount - 1);
  };

  return (
    <VStack alignItems="left" width="100%" spacing="3">
      <HStack>
        <Input
          value={value}
          onChange={(e) => updateOptionValue(e.target.value)}
          placeholder="Select Input"
          width="50%"
          isInvalid={lengthError || (isEmptyError && !value)}
          maxLength={801}
        />
        <Spacer />
        <Box color="grey.300" _hover={{ color: "blue.100" }}>
          <Button
            onClick={removeOption}
            as={IconButton}
            icon={<DeleteOutlineIcon />}
            color="currentColor"
            fontSize="24px"
            size="icon"
          />
        </Box>
      </HStack>
      <Checkbox
        isChecked={isCorrect}
        isInvalid={isCorrectError}
        onChange={(e) => markOptionCorrect(e.target.checked)}
      >
        Mark as Correct Answer
      </Checkbox>
      {lengthError && (
        <Text color="red.200">
          There is a limit of 800 characters in each multiple choice question.
        </Text>
      )}
    </VStack>
  );
};

export default MultipleChoiceOption;
