import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";

import GET_TEST_SESSION_BY_ACCESS_CODE from "../../../APIClients/queries/TestSessionQueries";
import { LeftArrowIcon } from "../../../assets/icons";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import AuthWrapper from "../AuthWrapper";

const StudentLogin = (): React.ReactElement => {
  const history = useHistory();
  const title = "Student Login";
  const subtitle = "Please enter your classroom's access code";
  const image = STUDENT_SIGNUP_IMAGE;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [checkPin] = useLazyQuery(GET_TEST_SESSION_BY_ACCESS_CODE, {
    onCompleted: () => {
      setError("");
      setSuccess(true);
    },
    onError: async () => {
      setError("Please ensure input is correct");
      setSuccess(false);
    },
  });

  const getPinBorderColor = () => {
    if (error) return "red.200 !important";
    if (success) return "green.200 !important";
    return "grey.100";
  };

  const handleComplete = (code: string) => {
    checkPin({
      variables: {
        accessCode: code,
      },
    });
  };

  const form = (
    <>
      {success && (
        <Text color="green.300" textStyle="smallerParagraph">
          Entered successfully
        </Text>
      )}
      <HStack>
        <PinInput
          autoFocus
          focusBorderColor="grey.200"
          onComplete={handleComplete}
          placeholder=""
          size="lg"
          variant="filled"
        >
          {[...Array(6)].map((i) => (
            <PinInputField
              key={i}
              _focus={{ backgroundColor: "grey.100" }}
              _hover={{ backgroundColor: "grey.100" }}
              backgroundColor="grey.100"
              borderColor={getPinBorderColor()}
              color="grey.300"
              fontSize="2.5rem"
              height="50%"
              m="3rem 0.6rem 7rem 0.6rem !important"
              style={{ width: "15%" }}
              textStyle="header1"
            />
          ))}
        </PinInput>
      </HStack>
      <Button
        leftIcon={<LeftArrowIcon />}
        onClick={() => {
          history.goBack();
        }}
        variant="tertiary"
      >
        Back to Home
      </Button>
    </>
  );

  return (
    <AuthWrapper
      error={error}
      form={form}
      image={image}
      subtitle={subtitle}
      title={title}
    />
  );
};

export default StudentLogin;
