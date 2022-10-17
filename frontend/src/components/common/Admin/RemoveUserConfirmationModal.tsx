import { Button, ModalFooter } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ADMIN_PAGE } from "../../../constants/Routes";
import ModalText from "../ModalText";

const RemoveUserModalConfirmation = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);

  return (
    <>
      <ModalText
        header="The user has been removed from the Jump Math Database"
        body={["The data has been removed securely."]}
      />
      <ModalFooter my={3}>
        <Button variant="primary" mr={2} onClick={navigateTo}>
          Return to Database
        </Button>
      </ModalFooter>
    </>
  );
};

export default RemoveUserModalConfirmation;
