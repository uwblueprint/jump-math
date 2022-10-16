import { Button, ModalFooter } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ADMIN_PAGE } from "../../../constants/Routes";
import ModalText from "./ModalText";

const RemoveUserErrorModal = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);
  return (
    <>
      <ModalText
        header="You do not have permission to remove this user."
        body={[
          "Please contact administration if you believe this is an error.",
        ]}
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
