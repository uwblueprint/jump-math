import React from "react";
import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { FractionMetadata } from "../../../../types/QuestionMetadataTypes";
import FractionWrapper from "../../../common/FractionWrapper";

import EditFractionModal from "./modals/fraction/EditFractionModal";

interface FractionElementProps {
  id: string;
  data: FractionMetadata;
}

const FractionElement = ({
  id,
  data,
}: FractionElementProps): React.ReactElement => {
  const [showEditFractionModal, setShowEditFractionModal] =
    React.useState(false);

  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <FractionWrapper
        denominator={String(data.denominator)}
        numerator={String(data.numerator)}
        readOnly
      />
      <Spacer />
      <Box _hover={{ color: "blue.100" }} color="grey.300">
        <Button
          as={IconButton}
          color="currentColor"
          fontSize="24px"
          icon={<EditOutlineIcon />}
          onClick={() => setShowEditFractionModal(true)}
          size="icon"
        />
      </Box>
      <EditFractionModal
        data={data}
        id={id}
        isOpen={showEditFractionModal}
        setOpen={setShowEditFractionModal}
      />
    </Flex>
  );
};

export default FractionElement;
