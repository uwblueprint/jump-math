import React from "react";
import { Box, Button, Flex, IconButton, Input, Spacer } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";

import EditShortAnswerModal from "./modals/short-answer/EditShortAnswerModal";

interface ShortAnswerElementProps {
  id: string;
  data: number;
}

const ShortAnswerElement = ({
  id,
  data,
}: ShortAnswerElementProps): React.ReactElement => {
  const [
    showEditShortAnswerModal,
    setShowEditShortAnswerModal,
  ] = React.useState(false);
  return (
    <Flex paddingLeft="6" width="100%">
      <Input
        borderColor="grey.300"
        borderRadius="0"
        focusBorderColor="grey.300"
        readOnly
        value={data}
        variant="outline"
        width="34%"
      />
      <Spacer />
      <Box _hover={{ color: "blue.100" }} color="grey.300">
        <Button
          as={IconButton}
          color="currentColor"
          fontSize="24px"
          icon={<EditOutlineIcon />}
          onClick={() => setShowEditShortAnswerModal(true)}
          size="icon"
        />
      </Box>
      <EditShortAnswerModal
        data={data}
        id={id}
        isOpen={showEditShortAnswerModal}
        setOpen={setShowEditShortAnswerModal}
      />
    </Flex>
  );
};

export default ShortAnswerElement;
