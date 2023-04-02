import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { DeleteOutlineIcon } from "../../../../../assets/icons";
import { MultiOptionData } from "../../../../../types/QuestionTypes";
import {
  exceedsMaxLength,
  updatedMultiOption,
} from "../../../../../utils/QuestionUtils";

interface MultiOptionProps {
  data: MultiOptionData;
  isEmptyError: boolean;
  isCorrectError: boolean;
  setOptions: React.Dispatch<React.SetStateAction<MultiOptionData[]>>;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
}

const MultiOption = ({
  data,
  isEmptyError,
  isCorrectError,
  setOptions,
  setOptionCount,
}: MultiOptionProps): React.ReactElement => {
  const { id, value, isCorrect } = data;
  const [lengthError, setLengthError] = useState(false);

  const updateOptionValue = (updatedValue: string) => {
    setLengthError(exceedsMaxLength(updatedValue));
    setOptions((prevOptions) => {
      return updatedMultiOption(id, prevOptions, updatedValue, isCorrect);
    });
  };

  const markOptionCorrect = (updatedIsCorrect: boolean) => {
    setOptions((prevOptions) => {
      return updatedMultiOption(id, prevOptions, value, updatedIsCorrect);
    });
  };

  const removeOption = () => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id),
    );
    setOptionCount((prevOptionCount) => prevOptionCount - 1);
  };

  return (
    <VStack alignItems="left" spacing="3" width="100%">
      <HStack>
        <Input
          isInvalid={lengthError || (isEmptyError && !value)}
          maxLength={801}
          onChange={(e) => updateOptionValue(e.target.value)}
          placeholder="Select Input"
          value={value}
          width="50%"
        />
        <Spacer />
        <Box _hover={{ color: "blue.100" }} color="grey.300">
          <Button
            as={IconButton}
            color="currentColor"
            fontSize="24px"
            icon={<DeleteOutlineIcon />}
            onClick={removeOption}
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

export default MultiOption;
