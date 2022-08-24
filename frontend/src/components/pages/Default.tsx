import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button as ChakraButton, Box } from "@chakra-ui/react"
import * as Routes from "../../constants/Routes";
import SampleContext from "../../contexts/SampleContext";

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

const DesignLibraryExamples = () => {
  return (
    <div>
      {/* Example: how to apply custom colors */}
      <ButtonGroup gap='4'>
          <ChakraButton bg="blue.50" color="white"> Very Light Blue Button </ChakraButton>
          <ChakraButton bg="blue.100" color="white"> Light Blue Button </ChakraButton>
          <ChakraButton bg="blue.200" color="white"> Medium Blue Button </ChakraButton>
          <ChakraButton bg="blue.300" color="white"> Blue Button </ChakraButton>
      </ButtonGroup>
      <Box textStyle='eyebrow'>hihihihihihi</Box>
    </div>
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
        <Button text="Create Entity" path={Routes.CREATE_ENTITY_PAGE} />
        <Button text="Update Entity" path={Routes.UPDATE_ENTITY_PAGE} />
        <Button text="Display Entities" path={Routes.DISPLAY_ENTITY_PAGE} />
        <Button
          text="Create Simple Entity"
          path={Routes.CREATE_SIMPLE_ENTITY_PAGE}
        />
        <Button
          text="Update Simple Entity"
          path={Routes.UPDATE_SIMPLE_ENTITY_PAGE}
        />
        <Button
          text="Display Simple Entities"
          path={Routes.DISPLAY_SIMPLE_ENTITY_PAGE}
        />
        <Button text="Edit Team" path={Routes.EDIT_TEAM_PAGE} />
        <Button text="Hooks Demo" path={Routes.HOOKS_PAGE} />
      </div>

      <div style={{ height: "2rem" }} />

      <TeamInfoDisplay />
      <DesignLibraryExamples />
    </div>
  );
};

export default Default;
