import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { ADMIN_PAGE } from "../../constants/Routes";
import { ReactComponent as EnvelopePaperIllustration } from "../../assets/illustrations/envelope-paper.svg";

const ConfirmationMessage = (): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(ADMIN_PAGE);
  return (
    <Container
      bg="blue.50"
      maxW="3xl"
      pt={32}
      pb={20}
      px={24}
      mx="auto"
      my={10}
      borderRadius="3xl"
      centerContent
    >
      <Box maxW="md">
        <EnvelopePaperIllustration
          style={{ paddingBottom: "1.5em", margin: "auto" }}
        />
        <Text textStyle="subtitle1">Thank you for your submission.</Text>
        <Text textStyle="paragraph">
          The associate will shortly get emailed regarding their onboarding
          process for Jump Math and changing their user name and password
          accordingly.
        </Text>
        <Text textStyle="paragraph">
          Changes will appear within 2-3 business days once the associate
          confirms the email.
        </Text>
        <Button onClick={navigateTo} mt={10} variant="primary">
          Return to Database
        </Button>
      </Box>
    </Container>
  );
};

export default ConfirmationMessage;
