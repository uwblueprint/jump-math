import React from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../assets/icons";

interface EditIconButtonProps {
  onClick: () => void;
}

const EditIconButton = ({
  onClick,
}: EditIconButtonProps): React.ReactElement => {
  return (
    <Box _hover={{ color: "grey.300" }} color="blue.300">
      <Button
        as={IconButton}
        color="currentColor"
        fontSize="24px"
        icon={<EditOutlineIcon />}
        onClick={onClick}
        size="icon"
      />
    </Box>
  );
};

export default EditIconButton;
