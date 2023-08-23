import React from "react";
import { Box, Flex, IconButton, Spacer, useDisclosure } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { MultiData } from "../../../../types/QuestionTypes";
import type { QuestionElementType } from "../../../../types/QuestionTypes";
import MultiOption from "../../../common/question-elements/multi-option/MultiOptionInput";

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
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex paddingBottom="4" paddingLeft="1" width="100%">
      <Box paddingRight="4" paddingTop="2">
        <MultiOption data={data} type={type} />
      </Box>
      <Spacer />
      <IconButton
        _hover={{ color: "blue.100" }}
        aria-label="Edit multiple choice"
        color="grey.300"
        icon={<EditOutlineIcon />}
        onClick={onOpen}
        size="icon"
      />
      <EditMultiOptionModal
        data={data}
        id={id}
        isOpen={isOpen}
        onClose={onClose}
        type={type}
      />
    </Flex>
  );
};

export default MultiOptionElement;
