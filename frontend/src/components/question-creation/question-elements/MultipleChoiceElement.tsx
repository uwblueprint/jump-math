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
import { MultipleChoiceData } from "../../../types/QuestionTypes";

import EditMultipleChoiceModal from "./modals/multiple-choice/EditMultipleChoiceModal";

interface MultipleChoiceElementProps {
  id: string;
  data: MultipleChoiceData;
  isMultiSelect: boolean;
}

const MultipleChoiceElement = ({
  id,
  data,
  isMultiSelect,
}: MultipleChoiceElementProps): React.ReactElement => {
  const [
    showEditMultipleChoiceModal,
    setShowEditMultipleChoiceModal,
  ] = React.useState(false);
  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      {isMultiSelect ? (
        <CheckboxGroup>
          <VStack alignItems="left" gap="1" paddingRight="4" paddingTop="2">
            {data.options.map((option, index) => (
              <Checkbox
                key={index}
                isChecked={option.isCorrect}
                isReadOnly
                marginBottom="0"
                size="lg"
              >
                {option.value}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      ) : (
        <RadioGroup>
          <VStack alignItems="left" gap="1" paddingRight="4" paddingTop="2">
            {data.options.map((option, index) => (
              <Radio
                key={index}
                isChecked={option.isCorrect}
                isReadOnly
                marginBottom="0"
                size="lg"
              >
                {option.value}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      )}
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
        isMultiSelect={isMultiSelect}
        isOpen={showEditMultipleChoiceModal}
        setOpen={setShowEditMultipleChoiceModal}
      />
    </Flex>
  );
};

export default MultipleChoiceElement;
