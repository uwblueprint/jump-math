import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { HOME_PAGE } from "../../constants/Routes";

interface RemoveUserPopoverProps {
  email: string;
}

const RemoveUserPopover = ({
  email,
}: RemoveUserPopoverProps): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(HOME_PAGE);
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RemoveUserPopover;
