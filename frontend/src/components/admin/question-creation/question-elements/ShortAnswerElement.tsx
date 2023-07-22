import React from "react";
import { Flex, Input, Spacer } from "@chakra-ui/react";

import type { ShortAnswerMetadata } from "../../../../types/QuestionMetadataTypes";
import EditIconButton from "../../../common/EditIconButton";

import EditShortAnswerModal from "./modals/short-answer/EditShortAnswerModal";

interface ShortAnswerElementProps {
  id: string;
  data: ShortAnswerMetadata;
}

const ShortAnswerElement = ({
  id,
  data,
}: ShortAnswerElementProps): React.ReactElement => {
  const [showEditShortAnswerModal, setShowEditShortAnswerModal] =
    React.useState(false);
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
      <EditIconButton
        color="grey.300"
        hoverColor="blue.100"
        onClick={() => setShowEditShortAnswerModal(true)}
      />
      <EditShortAnswerModal
        data={data.answer}
        id={id}
        isOpen={showEditShortAnswerModal}
        setOpen={setShowEditShortAnswerModal}
      />
    </Flex>
  );
};

export default ShortAnswerElement;
