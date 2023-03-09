import React from "react";
import {
  RadioGroup,
  Radio,
  VStack,
  Text,
  Button,
  IconButton,
  Input,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { EditOutlineIcon } from "../../../assets/icons";
import { MultipleChoiceData } from "../../../types/QuestionTypes";

interface MultipleChoiceElementProps {
  id: string;
  data: MultipleChoiceData;
}

const MultipleChoiceElement = ({
  id,
  data,
}: MultipleChoiceElementProps): React.ReactElement => {
  const [
    showAddMultipleChoiceModal,
    setShowAddMultipleChoiceModal,
  ] = React.useState(false);
  return (
    <Flex width="100%" paddingLeft="6">
      <RadioGroup color="blue.300">
        <VStack alignItems="left" gap={1}>
          {data.options.map((option, index) => (
            <Radio key={index} isReadOnly isChecked={option.isCorrect}>
              {option.data}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </Flex>
  );
};

export default MultipleChoiceElement;
