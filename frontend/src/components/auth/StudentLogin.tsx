import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PinInput, PinInputField, HStack, Button } from "@chakra-ui/react";
import AuthWrapper from "./AuthWrapper";
import { STUDENT_SIGNUP_IMAGE } from "../../assets/images";
import { LeftArrowIcon } from "../../assets/icons";

const StudentLogin = (): React.ReactElement => {
  const history = useHistory();
  const title = "Student Login";
  const subtitle = "Please enter your classroom's access code";
  const image = STUDENT_SIGNUP_IMAGE;

  const handleComplete = (code: string) => {};

  const form = (
    <>
      <HStack>
        <PinInput
          autoFocus
          focusBorderColor="grey.200"
          placeholder=""
          size="lg"
          variant="filled"
          onComplete={handleComplete}
        >
          {[...Array(6)].map((i) => (
            <PinInputField
              key={i}
              textStyle="header1"
              m="3rem 0.6rem 7rem 0.6rem !important"
              fontSize="2.5rem"
              color="grey.300"
              backgroundColor="grey.100"
              height="50%"
              style={{ width: "15%" }}
              _hover={{ backgroundColor: "grey.100" }}
              _focus={{ backgroundColor: "grey.100" }}
              _valid={{ backgroundColor: "green.200" }}
              _invalid={{ borderColor: "red.200" }}
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

  const [loginError, setLoginError] = useState(false);
  const error = loginError ? "Please ensure input is correct" : "";

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      image={image}
      form={form}
      error={error}
    />
  );
};

export default StudentLogin;
