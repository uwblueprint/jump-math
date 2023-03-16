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
  const [pin, setPin] = useState("");
  const [pinBorderColor, setPinBorderColor] = useState("grey.100");
  const [checkPin] = useLazyQuery(GET_TEST_SESSION_BY_ACCESS_CODE, {
    onCompleted: () => {
      setPinBorderColor("green.200 !important");
      setError("");
      setSuccess(true);
    },
    onError: async () => {
      setPinBorderColor("red.200 !important");
      setError("Please ensure input is correct");
      setSuccess(false);
    },
  });

  const handleComplete = (code: string) => {
    checkPin({
      variables: {
        accessCode: code,
      },
    });
  };

  const resetPin = () => {
    if (error) {
      setPin("");
      setError("");
      setPinBorderColor("grey.100");
    }
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
          onChange={(value: string) => setPin(value)}
          onComplete={handleComplete}
          placeholder=""
          size="lg"
          value={pin}
          variant="filled"
        >
          {[...Array(6)].map((i) => (
            <PinInputField
              key={i}
              _focus={{ backgroundColor: "grey.100" }}
              _hover={{ backgroundColor: "grey.100" }}
              backgroundColor="grey.100"
              borderColor={pinBorderColor}
              color="grey.300"
              fontSize="2.5rem"
              height="50%"
              m="3rem 0.6rem 7rem 0.6rem !important"
              onFocus={resetPin}
              style={{ width: "15%" }}
              textStyle="header1"
              value={i}
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
