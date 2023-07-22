import React from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../assets/icons";

interface EditIconButtonProps {
  color: string;
  hoverColor: string;
  onClick: () => void;
}

const EditIconButton = ({
  onClick,
  color,
  hoverColor,
}: EditIconButtonProps): React.ReactElement => {
  return (
    <Box _hover={{ color: hoverColor }} color={color}>
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
