import React from "react";
import { VStack } from "@chakra-ui/react";

import Popover from "../../common/popover/Popover";

import RemoveUserModal from "./RemoveUserModal";

interface RemoveUserPopoverProps {
  name: string;
  email: string;
}

const RemoveUserPopover = ({
  name,
  email,
}: RemoveUserPopoverProps): React.ReactElement => (
  <Popover>
    <VStack spacing="0em">
      <RemoveUserModal email={email} name={name} />
    </VStack>
  </Popover>
);

export default RemoveUserPopover;
