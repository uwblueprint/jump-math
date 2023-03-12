import React from "react";
import { useHistory } from "react-router-dom";
import { Button, ModalFooter } from "@chakra-ui/react";

import { USER_DATABASE } from "../../constants/Routes";
import ModalText from "../common/ModalText";

const RemoveUserErrorModal = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(USER_DATABASE);
  return (
    <>
      <ModalText
        header="Unable to remove user at this moment. Please try again."
        textColor="red.200"
      />
      <ModalFooter my={3}>
        <Button mr={2} onClick={navigateTo} variant="primary">
          Return to Database
        </Button>
      </ModalFooter>
    </>
  );
};

export default RemoveUserErrorModal;
