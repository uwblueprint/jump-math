import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button as ChakraButton, Box, VStack } from "@chakra-ui/react"

import * as Routes from "../../constants/Routes";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";

type ButtonProps = { text: string; path: string };

const Button = ({ text, path }: ButtonProps) => {
  const history = useHistory();
  const navigateTo = () => history.push(path);
  return (
    <button className="btn btn-primary" onClick={navigateTo} type="button">
      {text}
    </button>
  );
};

const TeamInfoDisplay = () => {
  const { teamName, numTerms, members, isActive } = useContext(SampleContext);
  return (
    <div>
      <h2>Team Info</h2>
      <div>Name: {teamName}</div>
      <div># terms: {numTerms}</div>
      <div>
        Members:{" "}
        {members.map(
          (name, i) => ` ${name}${i === members.length - 1 ? "" : ","}`,
        )}
      </div>
      <div>Active: {isActive ? "Yes" : "No"}</div>
    </div>
  );
};

// Example: how to apply custom colors
const DesignLibraryExamples = () => {
  return (
    <>
      <VStack>
        <Box textStyle='header1'>header1</Box>
        <Box textStyle='header2'>header2</Box>
        <Box textStyle='header3'>header3</Box>
        <Box textStyle='header4'>header4</Box>
        <Box textStyle='subtitle1'>subtitle1</Box>
        <Box textStyle='subtitle2'>subtitle2</Box>
        <Box textStyle='paragraph'>paragraph</Box>
        <Box textStyle='link'>link</Box>
        <Box textStyle='eyebrow'>eyebrow</Box>
      </VStack>
    </>

  );
};

const Default = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h1>Default Page</h1>
      <div className="btn-group" style={{ paddingRight: "10px" }}>
        <Logout />
        <RefreshCredentials />
        <ResetPassword />
        <Button text="Student Page" path={Routes.STUDENT_PAGE} />
        <Button text="Teacher Page" path={Routes.TEACHER_PAGE} />
        <Button text="Admin Page" path={Routes.ADMIN_PAGE} />
        <Button text="Component Library" path={Routes.COMPONENT_LIBRARY} />
      </div>
      <div style={{ height: "2rem" }} />
    </div>
  );
};

export default Default;
