import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider, ModalFooter } from "@chakra-ui/react";

import { USER_DATABASE } from "../../constants/Routes";
import ModalText from "../common/ModalText";

const RemoveUserConfirmationModal = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(USER_DATABASE);

  return (
    <>
      <ModalText
        body={["The data has been removed securely."]}
        header="The user has been removed from the Jump Math Database"
      />
      <Divider style={{ marginTop: "1.5em" }} />
      <ModalFooter my={3}>
        <Button mr={2} onClick={navigateTo} variant="primary">
          Return to Database
        </Button>
      </ModalFooter>
    </>
  );
};

export default RemoveUserConfirmationModal;
