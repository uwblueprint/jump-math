import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button as ChakraButton, VStack, Text } from "@chakra-ui/react"

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";
import { ArrowBackOutlineIcon, ArrowForwardOutlineIcon } from "../common/icons";
import MainPageButton from "../common/MainPageButton";

const ButtonExamples = () => {
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
        <Text textStyle='header1'>header1</Text>
        <Text textStyle='header2'>header2</Text>
        <Text textStyle='header3'>header3</Text>
        <Text textStyle='header4'>header4</Text>
        <Text textStyle='subtitle1'>subtitle1</Text>
        <Text textStyle='subtitle2'>subtitle2</Text>
        <Text textStyle='paragraph'>paragraph</Text>
        <Text textStyle='link'>link</Text>
        <Text textStyle='eyebrow'>eyebrow</Text>
      </VStack>
  
    </>
  );
};

const ComponentLibrary = (): React.ReactElement => {
  return (
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <h1>Component Library</h1>
        <div style={{ height: "2rem" }} />
        <ButtonExamples />
        <MainPageButton />
      </div>
    );
  };

export default ComponentLibrary;
