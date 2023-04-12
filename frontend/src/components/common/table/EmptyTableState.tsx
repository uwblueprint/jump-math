import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";

import DisplayAssessments from "../../../assets/illustrations/display-assessments.svg";
import { CREATE_ASSESSMENT_PAGE } from "../../../constants/Routes";

const EmptyTableState = (): React.ReactElement => {
  const history = useHistory();
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
        <Button
          onClick={() => history.push(CREATE_ASSESSMENT_PAGE)}
          variant="primary"
        >
          Create assessment
        </Button>
      </VStack>
    </Center>
  );
};

export default EmptyTableState;
