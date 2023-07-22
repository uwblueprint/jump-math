import React from "react";
import { Checkbox, Flex, Radio, Spacer, VStack } from "@chakra-ui/react";

import type { MultiData } from "../../../../types/QuestionTypes";
import { QuestionElementType } from "../../../../types/QuestionTypes";
import EditIconButton from "../../../common/EditIconButton";

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
  const [showEditMultipleChoiceModal, setShowEditMultipleChoiceModal] =
    React.useState(false);

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
      <EditIconButton
        color="grey.300"
        hoverColor="blue.100"
        onClick={() => setShowEditMultipleChoiceModal(true)}
      />
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
