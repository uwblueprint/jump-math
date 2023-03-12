import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Text, VStack } from "@chakra-ui/react";

import { HOME_PAGE } from "../../constants/Routes";

const NotFound = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(HOME_PAGE);

  return (
    <VStack color="blue.300" height="100vh" justifyContent="center" spacing={8}>
      <Text textStyle="subtitle1">Error 404</Text>
      <Text textStyle="header4">You are not authorized to view this page.</Text>
      <Button variant="primary" my={2} onClick={navigateTo}>
        Go to home page
      </Button>
    </VStack>
  );
};

export default NotFound;
