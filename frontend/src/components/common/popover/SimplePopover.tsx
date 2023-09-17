import React from "react";
import { Button, Divider, VStack } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";

import Popover from "./Popover";
import PopoverButton from "./PopoverButton";

type SimplePopoverProps = {
  isDisabled?: boolean;
  text: string;
  items: { name: string; onClick: () => void }[];
};

const SimplePopover = ({ isDisabled, text, items }: SimplePopoverProps) => (
  <Popover
    placement="bottom"
    trigger={
      <Button
        isDisabled={isDisabled}
        minW={0}
        rightIcon={<PlusOutlineIcon />}
        variant="primary"
      >
        {text}
      </Button>
    }
  >
    <VStack divider={<Divider />} spacing={0}>
      {items.map((item) => (
        <PopoverButton
          key={item.name}
          aria-label={`Add ${item.name.toLowerCase()}`}
          name={item.name}
          onClick={item.onClick}
        />
      ))}
    </VStack>
  </Popover>
);

export default SimplePopover;
