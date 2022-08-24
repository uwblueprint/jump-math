import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button as ChakraButton, Box, VStack } from "@chakra-ui/react"

import * as Routes from "../../constants/Routes";
import SampleContext from "../../contexts/SampleContext";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";
import { ArrowBackOutlineIcon, ArrowForwardOutlineIcon } from "../common/icons";

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
      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap='4'>
            <ChakraButton variant="primary">Primary</ChakraButton>
            <ChakraButton variant="secondary">Secondary</ChakraButton>
            <ChakraButton variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="primary">Primary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="secondary">Secondary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="primary">Primary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="secondary">Secondary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
      </VStack>

      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap='4'>
            <ChakraButton variant="primary" isActive>Primary</ChakraButton>
            <ChakraButton variant="secondary" isActive>Secondary</ChakraButton>
            <ChakraButton variant="tertiary" isActive>Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="primary" isActive>Primary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="secondary" isActive>Secondary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="tertiary" isActive>Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="primary" isActive>Primary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="secondary" isActive>Secondary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="tertiary" isActive>Tertiary</ChakraButton>
        </ButtonGroup>
      </VStack>


      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap='4'isDisabled>
            <ChakraButton variant="primary">Primary</ChakraButton>
            <ChakraButton variant="secondary">Secondary</ChakraButton>
            <ChakraButton variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'isDisabled>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="primary">Primary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="secondary">Secondary</ChakraButton>
            <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap='4'isDisabled>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="primary">Primary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="secondary">Secondary</ChakraButton>
            <ChakraButton rightIcon={<ArrowForwardOutlineIcon />} variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
      </VStack>
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
