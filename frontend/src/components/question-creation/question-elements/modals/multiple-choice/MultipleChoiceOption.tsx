import React from "react";
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
import {
  updatedMultipleChoiceOptionValue,
  updatedMultipleChoiceCorrectOption,
} from "../../../../../utils/QuestionUtils";

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
  const { id, value } = data;

  const updateOptionValue = (updatedValue: string) => {
    setOptions((prevOptions) => {
      return updatedMultipleChoiceOptionValue(id, prevOptions, updatedValue);
    });
  };

  const markOptionCorrect = (isCorrect: boolean) => {
    setOptions((prevOptions) => {
      return updatedMultipleChoiceCorrectOption(id, prevOptions, isCorrect);
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
          onChange={(e) => updateOptionValue(e.target.value)}
          placeholder="Select Input"
          width="50%"
          isInvalid={isEmptyError && !value}
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
        isInvalid={isCorrectError}
        onChange={(e) => markOptionCorrect(e.target.checked)}
      >
        Mark as Correct Answer
      </Checkbox>
    </VStack>
  );
};

export default MultipleChoiceOption;
