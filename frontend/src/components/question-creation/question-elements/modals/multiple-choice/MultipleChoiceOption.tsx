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
import update from "immutability-helper";
import { DeleteOutlineIcon } from "../../../../../assets/icons";
import { MultipleChoiceOptionData } from "../../../../../types/QuestionTypes";

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
      const indexToUpdate = prevOptions.findIndex((option) => option.id === id);
      return update(prevOptions, {
        [indexToUpdate]: {
          $merge: {
            data: updatedValue,
          },
        },
      });
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
      <Checkbox>Mark as Correct Answer</Checkbox>
    </VStack>
  );
};

export default MultipleChoiceOption;
