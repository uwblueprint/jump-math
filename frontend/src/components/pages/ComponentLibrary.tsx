/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  ButtonGroup,
  Button as ChakraButton,
  VStack,
  Text,
} from "@chakra-ui/react";

import { ArrowBackOutlineIcon, ArrowForwardOutlineIcon } from "../common/icons";
import AdminConfirmationMessage from "../common/Admin/AdminConfirmationMessage";
import RemoveUserPopover from "../common/Admin/RemoveUserPopover";
import QuestionCard from "../common/QuestionCard";
import Sidebar from "../common/Sidebar";

import Page from "../../types/PageTypes";

const ButtonExamples = () => {
  return (
    <>
      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap="4">
          <ChakraButton variant="primary">Primary</ChakraButton>
          <ChakraButton variant="secondary">Secondary</ChakraButton>
          <ChakraButton variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4">
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="primary">
            Primary
          </ChakraButton>
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="secondary">
            Secondary
          </ChakraButton>
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="tertiary">
            Tertiary
          </ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4">
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="primary"
          >
            Primary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="secondary"
          >
            Secondary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="tertiary"
          >
            Tertiary
          </ChakraButton>
        </ButtonGroup>
      </VStack>

      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap="4">
          <ChakraButton variant="primary" isActive>
            Primary
          </ChakraButton>
          <ChakraButton variant="secondary" isActive>
            Secondary
          </ChakraButton>
          <ChakraButton variant="tertiary" isActive>
            Tertiary
          </ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4">
          <ChakraButton
            leftIcon={<ArrowBackOutlineIcon />}
            variant="primary"
            isActive
          >
            Primary
          </ChakraButton>
          <ChakraButton
            leftIcon={<ArrowBackOutlineIcon />}
            variant="secondary"
            isActive
          >
            Secondary
          </ChakraButton>
          <ChakraButton
            leftIcon={<ArrowBackOutlineIcon />}
            variant="tertiary"
            isActive
          >
            Tertiary
          </ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4">
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="primary"
            isActive
          >
            Primary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="secondary"
            isActive
          >
            Secondary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="tertiary"
            isActive
          >
            Tertiary
          </ChakraButton>
        </ButtonGroup>
      </VStack>

      <VStack spacing={4} bg="yellow.50" padding={6}>
        <ButtonGroup gap="4" isDisabled>
          <ChakraButton variant="primary">Primary</ChakraButton>
          <ChakraButton variant="secondary">Secondary</ChakraButton>
          <ChakraButton variant="tertiary">Tertiary</ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4" isDisabled>
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="primary">
            Primary
          </ChakraButton>
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="secondary">
            Secondary
          </ChakraButton>
          <ChakraButton leftIcon={<ArrowBackOutlineIcon />} variant="tertiary">
            Tertiary
          </ChakraButton>
        </ButtonGroup>
        <ButtonGroup gap="4" isDisabled>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="primary"
          >
            Primary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="secondary"
          >
            Secondary
          </ChakraButton>
          <ChakraButton
            rightIcon={<ArrowForwardOutlineIcon />}
            variant="tertiary"
          >
            Tertiary
          </ChakraButton>
        </ButtonGroup>
      </VStack>

      <VStack>
        <Text textStyle="header1">header1</Text>
        <Text textStyle="header2">header2</Text>
        <Text textStyle="header3">header3</Text>
        <Text textStyle="header4">header4</Text>
        <Text textStyle="subtitle1">subtitle1</Text>
        <Text textStyle="subtitle2">subtitle2</Text>
        <Text textStyle="paragraph">paragraph</Text>
        <Text textStyle="link">link</Text>
        <Text textStyle="eyebrow">eyebrow</Text>
      </VStack>
    </>
  );
};

const pages: Page[] = [
  {
    title: "Student Page",
    url: "/students",
    subPages: [
      { title: "Also student", url: "/students" },
      { title: "Another one", url: "/students" },
    ],
  },
  { title: "Teacher Page", url: "/teachers" },
  { title: "Admin Page", url: "/admins" },
  { title: "Library", url: "/component-library" },
  { title: "Assessments", url: "/" },
];

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <Sidebar pages={pages} />
      <ButtonExamples />
      <AdminConfirmationMessage />
      <RemoveUserPopover name="Sam Hutchinson" email="shutch@jumpmath.ca" />
      <QuestionCard
        date={new Date()}
        title="Question Title"
        image=""
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, luctus id elementum, pellentesque ornare consectetur ac pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, luctus id elementum, pellentesque ornare consectetur ac pharetra. Lorem ipsum dolor sit amet,"
        tags={["Grade 2", "Unit #", "Lesson #"]}
      />
    </div>
  );
};

export default ComponentLibrary;
