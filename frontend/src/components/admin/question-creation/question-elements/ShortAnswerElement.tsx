import React from "react";
import {
  Flex,
  IconButton,
  Input,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { ShortAnswerMetadata } from "../../../../types/QuestionMetadataTypes";

import EditShortAnswerModal from "./modals/short-answer/EditShortAnswerModal";

interface ShortAnswerElementProps {
  id: string;
  data: ShortAnswerMetadata;
}

const ShortAnswerElement = ({
  id,
  data,
}: ShortAnswerElementProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <Input
        borderColor="grey.300"
        borderRadius="0"
        focusBorderColor="grey.300"
        readOnly
        value={data.answer}
        variant="outline"
        width="34%"
      />
      <Spacer />
      <IconButton
        _hover={{ color: "blue.100" }}
        aria-label="Edit short answer"
        color="grey.300"
        icon={<EditOutlineIcon />}
        onClick={onOpen}
        size="icon"
      />
      <EditShortAnswerModal
        data={data.answer}
        id={id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default ShortAnswerElement;
