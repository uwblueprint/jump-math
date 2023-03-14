import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, HStack, PinInput, PinInputField } from "@chakra-ui/react";

import { LeftArrowIcon } from "../../../assets/icons";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import AuthWrapper from "../AuthWrapper";

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
              _invalid={{ borderColor: "red.200" }}
              _valid={{ backgroundColor: "green.200" }}
              backgroundColor="grey.100"
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

  const [loginError, setLoginError] = useState(false);
  const error = loginError ? "Please ensure input is correct" : "";

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
