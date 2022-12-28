import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE } from "../../../../constants/Routes";
import NavigationButtons from "../NavigationButtons";
import { TeacherSignupProps } from "../types";

const TeacherSignupOne = ({
  setPage,
  register,
  errors,
}: TeacherSignupProps): React.ReactElement => {
  const history = useHistory();
  return (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Enter your credentials below to get access to your classes
      </Text>

      <NavigationButtons
        onContinueClick={() => setPage(2)}
        onBackClick={() => history.push(LOGIN_PAGE)}
        firstPage
      />
    </VStack>
  );
};

export default TeacherSignupOne;
