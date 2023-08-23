import React from "react";
import { Flex, IconButton, Spacer, useDisclosure } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { FractionMetadata } from "../../../../types/QuestionMetadataTypes";
import FractionInput from "../../../common/question-elements/fraction/FractionInput";

import EditFractionModal from "./modals/fraction/EditFractionModal";

interface FractionElementProps {
  id: string;
  data: FractionMetadata;
}

const FractionElement = ({
  id,
  data,
}: FractionElementProps): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <FractionInput
        denominator={String(data.denominator)}
        numerator={String(data.numerator)}
        readOnly
      />
      <Spacer />
      <IconButton
        _hover={{ color: "blue.100" }}
        aria-label="Edit fraction"
        color="grey.300"
        icon={<EditOutlineIcon />}
        onClick={onOpen}
        size="icon"
      />
      <EditFractionModal
        data={data}
        id={id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default FractionElement;
