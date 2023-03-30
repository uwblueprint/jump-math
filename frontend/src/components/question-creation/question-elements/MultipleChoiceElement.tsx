import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import {
  MultipleChoiceData,
  QuestionElementType,
} from "../../../types/QuestionTypes";

import EditMultipleChoiceModal from "./modals/multiple-choice/EditMultipleChoiceModal";

interface MultipleChoiceElementProps {
  id: string;
  data: MultipleChoiceData;
  type: QuestionElementType;
}

const MultipleChoiceElement = ({
  id,
  data,
  type,
}: MultipleChoiceElementProps): React.ReactElement => {
  const [
    showEditMultipleChoiceModal,
    setShowEditMultipleChoiceModal,
  ] = React.useState(false);
  const InputType =
    type === QuestionElementType.MULTIPLE_CHOICE ? Checkbox : Radio;

  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <VStack alignItems="left" gap="1" paddingRight="4" paddingTop="2">
        {data.options.map((option, index) => {
          const props = {
            isChecked: option.isCorrect,
            isReadOnly: true,
            marginBottom: "0",
            size: "lg",
          };
          return type === QuestionElementType.MULTIPLE_CHOICE ? (
            <Radio key={index} {...props}>
              {option.value}
            </Radio>
          ) : (
            <Checkbox key={index} {...props}>
              {option.value}
            </Checkbox>
          );
        })}
      </VStack>
      <Spacer />
      <Box _hover={{ color: "blue.100" }} color="grey.300">
        <Button
          as={IconButton}
          color="currentColor"
          fontSize="24px"
          icon={<EditOutlineIcon />}
          onClick={() => setShowEditMultipleChoiceModal(true)}
          size="icon"
        />
      </Box>
      <EditMultipleChoiceModal
        data={data}
        id={id}
        isOpen={showEditMultipleChoiceModal}
        setOpen={setShowEditMultipleChoiceModal}
        type={type}
      />
    </Flex>
  );
};

export default MultipleChoiceElement;
