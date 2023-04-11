import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ReactComponent as DisplayAssessments } from "../../../assets/illustrations/display-assessments.svg";
import IllustrationWrapper from "../IllustrationWrapper";

const NoResultsTableState = (): React.ReactElement => {
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minHeight="60vh"
      minWidth="100%"
    >
      <VStack>
        <IllustrationWrapper Illustration={DisplayAssessments} pb="1rem" />
        <Text textStyle="subtitle1">You currently have no assessments.</Text>
        <Text paddingBottom="2rem" textStyle="paragraph">
          Create your first assessment
        </Text>
        <Button variant="primary">Create assessment</Button>
      </VStack>
    </Center>
  );
};

export default NoResultsTableState;
