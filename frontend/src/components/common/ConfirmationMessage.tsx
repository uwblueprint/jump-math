import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { ADMIN_PAGE } from "../../constants/Routes";

const ConfirmationMessage = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);
  return (
    <Box bg="blue.50" w="100%" p={20} m={10} borderRadius="3xl">
      <p>Illustration</p>
      <h1>Thank you for your submission.</h1>
      <p>
        The associate will shortly get emailed regarding their onboarding
        process for Jump Math and changing their user name and password
        accordingly. Changes will appear within 2-3 business days once the
        associate confirms the email.
      </p>
      <Button onClick={navigateTo} mt={10} variant="primary">
        Return to Database
      </Button>
    </Box>
  );
};

export default ConfirmationMessage;
