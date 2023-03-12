import React from "react";
import { Button } from "@chakra-ui/react";

type ModalFooterButtonsProps = {
  onDiscard: () => void;
  onSave: () => void;
};

const ModalFooterButtons = ({
  onDiscard,
  onSave,
}: ModalFooterButtonsProps): React.ReactElement => {
  return (
    <>
      <Button
        borderColor="blue.50"
        minWidth="108px"
        mr={2}
        onClick={onDiscard}
        variant="secondary"
        width="108px"
      >
        Discard
      </Button>
      <Button minWidth="108px" onClick={onSave} variant="primary" width="108px">
        Save
      </Button>
    </>
  );
};

export default ModalFooterButtons;
