import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PinInput, PinInputField, HStack, Button } from "@chakra-ui/react";
import AuthWrapper from "./AuthWrapper";
import { STUDENT_SIGNUP_IMAGE } from "../../assets/images";
import { LeftArrowIcon } from "../../assets/icons";

const StudentLogin = (): React.ReactElement => {
  // For back button
  const history = useHistory();

  // Some CS
  const pinWidth = "60px";
  const pinHeight = "100px";
  const margin = "10px 10px 90px 10px !important";
  const fontSize = "30px";
  const fontColor = "grey.300";

  // Fields for AuthWrapper component
  const title = "Student Login";
  const subtitle = "Please enter your classroom's access code";
  const image = STUDENT_SIGNUP_IMAGE;
  const form = (
    <>
      <HStack>
        <PinInput
          autoFocus
          focusBorderColor="blue.100"
          placeholder=""
          size="lg"
          variant="filled"
        >
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
          <PinInputField
            textStyle="header1"
            m={margin}
            fontSize={fontSize}
            color={fontColor}
            height={pinHeight}
            style={{ width: pinWidth }}
            _invalid={{ backgroundColor: "red.50", borderColor: "red.200" }}
          />
        </PinInput>
      </HStack>
      <Button
        leftIcon={<LeftArrowIcon />}
        onClick={() => {
          history.goBack();
        }}
        textStyle="paragraph"
        fontWeight="500"
        variant="link"
        _hover={{ color: "blue.200", textDecoration: "none" }}
        color="blue.300"
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
