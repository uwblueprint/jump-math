import React from "react";
import {
  RadioGroup,
  Radio,
  VStack,
  Button,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { EditOutlineIcon } from "../../../assets/icons";
import { MultipleChoiceData } from "../../../types/QuestionTypes";
import EditMultipleChoiceModal from "./modals/multiple-choice/EditMultipleChoiceModal";

interface MultipleChoiceElementProps {
  id: string;
  data: MultipleChoiceData;
}

const MultipleChoiceElement = ({
  id,
  data,
}: MultipleChoiceElementProps): React.ReactElement => {
  const [
    showEditMultipleChoiceModal,
    setShowEditMultipleChoiceModal,
  ] = React.useState(false);
  return (
    <Flex width="100%" paddingLeft="6" paddingBottom="4">
      <RadioGroup>
        <VStack alignItems="left" paddingTop="2" gap="1">
          {data.options.map((option, index) => (
            <Radio
              key={index}
              size="lg"
              isReadOnly
              isChecked={option.isCorrect}
              marginBottom="0"
            >
              {option.value}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <Spacer />
      <Box color="grey.300" _hover={{ color: "blue.100" }}>
        <Button
          onClick={() => setShowEditMultipleChoiceModal(true)}
          as={IconButton}
          icon={<EditOutlineIcon />}
          color="currentColor"
          fontSize="24px"
          size="icon"
        />
      </Box>
      <EditMultipleChoiceModal
        isOpen={showEditMultipleChoiceModal}
        setOpen={setShowEditMultipleChoiceModal}
        id={id}
        data={data}
      />
    </Flex>
  );
};

export default MultipleChoiceElement;
