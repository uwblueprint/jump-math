import React from "react";
import { Button, IconButton, Input, Flex, Box, Spacer } from "@chakra-ui/react";
import { EditOutlineIcon } from "../../../assets/icons";
import EditShortAnswerModal from "./modals/short-answer/EditShortAnswerModal";

interface ShortAnswerElementProps {
  id: string;
  data: string;
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
    <Flex width="100%" paddingLeft="6">
      <Input
        value={data}
        readOnly
        variant="outline"
        borderRadius="0"
        borderColor="grey.300"
        focusBorderColor="grey.300"
        width="34%"
      />
      <Spacer />
      <Box color="grey.300" _hover={{ color: "blue.100" }}>
        <Button
          onClick={() => setShowEditShortAnswerModal(true)}
          as={IconButton}
          icon={<EditOutlineIcon />}
          color="currentColor"
          fontSize="24px"
          size="icon"
        />
      </Box>
      <EditShortAnswerModal
        isOpen={showEditShortAnswerModal}
        setOpen={setShowEditShortAnswerModal}
        id={id}
        data={data}
      />
    </Flex>
  );
};

export default ShortAnswerElement;
