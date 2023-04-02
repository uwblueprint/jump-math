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
import { MultiData, QuestionElementType } from "../../../types/QuestionTypes";

import EditMultiOptionModal from "./modals/multi-option/EditMultiOptionModal";

interface MultiOptionElementProps {
  id: string;
  data: MultiData;
  type: QuestionElementType;
}

const MultiOptionElement = ({
  id,
  data,
  type,
}: MultiOptionElementProps): React.ReactElement => {
  const [
    showEditMultipleChoiceModal,
    setShowEditMultipleChoiceModal,
  ] = React.useState(false);

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
      <EditMultiOptionModal
        data={data}
        id={id}
        isOpen={showEditMultipleChoiceModal}
        setOpen={setShowEditMultipleChoiceModal}
        type={type}
      />
    </Flex>
  );
};

export default MultiOptionElement;
