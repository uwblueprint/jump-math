import { Button, ModalFooter } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ADMIN_PAGE } from "../../constants/Routes";
import ModalText from "../common/ModalText";

const RemoveUserErrorModal = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);
  return (
    <>
      <ModalText
        header="Unable to remove user at this moment. Please try again."
        textColor="red.200"
      />
      <ModalFooter my={3}>
        <Button variant="primary" mr={2} onClick={navigateTo}>
          Return to Database
        </Button>
      </ModalFooter>
    </>
  );
};

export default RemoveUserErrorModal;
