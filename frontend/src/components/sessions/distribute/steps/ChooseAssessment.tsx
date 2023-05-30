/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import FormHeader from "../FormHeader";

interface ChooseAssessmentProps {
  setTestId: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseAssessment = ({
  setTestId,
}: ChooseAssessmentProps): React.ReactElement => {
  return (
    <VStack align="left">
      <FormHeader isCurrentPage={true} />
      <Text color="blue.300" textAlign="left" textStyle="header4">
        Choose an Assessment
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        Please enter the name of the assessment you&apos;re looking for or use
        filter/sort options to find the assessment that suits your needs.
      </Text>
    </VStack>
  );
};

export default ChooseAssessment;
