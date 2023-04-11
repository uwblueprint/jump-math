import React from "react";
import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";

import DisplayAssessments from "../../../assets/illustrations/display-assessments.svg";

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
        <Image
          height="8rem"
          paddingBottom="1rem"
          src={DisplayAssessments}
          width="8rem"
        />
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
