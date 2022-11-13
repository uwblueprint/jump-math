import React from "react";

import { Button } from "@chakra-ui/react";

type ModalFooterButtonsProps = {
  onModalClose: () => void;
};

const ModalFooterButtons = ({
  onModalClose,
}: ModalFooterButtonsProps): React.ReactElement => {
  return (
    <>
      <Button
        variant="secondary"
        onClick={onModalClose}
        mr={2}
        borderColor="blue.50"
        minWidth="108px"
        width="108px"
      >
        Discard
      </Button>
      <Button variant="primary" minWidth="108px" width="108px" type="submit">
        Save
      </Button>
    </>
  );
};

export default ModalFooterButtons;
