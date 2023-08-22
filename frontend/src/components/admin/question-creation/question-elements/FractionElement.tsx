import React from "react";
import { Box, Flex, IconButton, Spacer, useDisclosure } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { FractionMetadata } from "../../../../types/QuestionMetadataTypes";
import FractionInput from "../../../common/fraction/FractionInput";

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
      <Box backgroundColor="grey.100" borderRadius="6px">
        <FractionInput
          denominator={String(data.denominator)}
          hideBorder
          numerator={String(data.numerator)}
          readOnly
          wholeNumber={
            data.wholeNumber !== null ? String(data.wholeNumber) : null
          }
        />
      </Box>
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
