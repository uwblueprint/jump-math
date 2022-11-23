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
        variant="secondary"
        onClick={onDiscard}
        mr={2}
        borderColor="blue.50"
        minWidth="108px"
        width="108px"
      >
        Discard
      </Button>
      <Button variant="primary" minWidth="108px" width="108px" onClick={onSave}>
        Save
      </Button>
    </>
  );
};

export default ModalFooterButtons;
