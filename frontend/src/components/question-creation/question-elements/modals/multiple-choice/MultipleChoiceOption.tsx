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
} from "@chakra-ui/react";
import { DeleteOutlineIcon } from "../../../../../assets/icons";
import { MultipleChoiceOptionData } from "../../../../../types/QuestionTypes";
import { updatedMultipleChoiceOption } from "../../../../../utils/QuestionUtils";

interface MultipleChoiceOptionProps {
  data: MultipleChoiceOptionData;
  setOptions: React.Dispatch<React.SetStateAction<MultipleChoiceOptionData[]>>;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
}

const MultipleChoiceOption = ({
  data,
  setOptions,
  setOptionCount,
}: MultipleChoiceOptionProps): React.ReactElement => {
  const { id } = data;

  const updateOptionValue = (updatedValue: string) => {
    setOptions((prevOptions) => {
      return updatedMultipleChoiceOption(id, prevOptions, updatedValue);
    });
  };

  const markOptionCorrect = (isCorrect: boolean) => {
    setOptions((prevOptions) => {
      return updatedMultipleChoiceOption(id, prevOptions, undefined, isCorrect);
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
      <Checkbox onChange={(e) => markOptionCorrect(e.target.checked)}>
        Mark as Correct Answer
      </Checkbox>
    </VStack>
  );
};

export default MultipleChoiceOption;
