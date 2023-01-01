/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  ButtonGroup,
  Button as ChakraButton,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
  ArrowBackOutlineIcon,
  ArrowForwardOutlineIcon,
  BookIcon,
} from "../../assets/icons";
import AdminConfirmationMessage from "../user-management/AdminConfirmationMessage";
import RemoveUserPopover from "../user-management/RemoveUserPopover";
import QuestionCard from "../common/QuestionCard";
import Sidebar from "../common/Sidebar";
import AddAdminModal from "../user-management/AddAdminModal";
// eslint-disable-next-line import/no-named-as-default
import AdminUserTable from "../user-management/AdminUserTable";

import * as Routes from "../../constants/Routes";
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
    url: Routes.STUDENT_PAGE,
    subPages: [
      { title: "Also student", url: Routes.STUDENT_PAGE },
      { title: "Another one", url: Routes.STUDENT_PAGE },
    ],
    icon: BookIcon,
  },
  { title: "Teacher Page", url: Routes.TEACHER_PAGE, icon: BookIcon },
  { title: "Admin Page", url: Routes.ADMIN_PAGE, icon: BookIcon },
  { title: "Library", url: Routes.COMPONENT_LIBRARY, icon: BookIcon },
  { title: "Assessments", url: "/", icon: BookIcon },
];

const ADMINUSERS = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "AJohnDoe@jumpmath.ca",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "BJaneDoe@jumpmath.ca",
  },
  {
    firstName: "Mary",
    lastName: "Jane",
    email: "CMaryjane@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
  },
];

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <Sidebar pages={pages} />
      <ButtonExamples />
      <AdminConfirmationMessage />
      <RemoveUserPopover name="Sam Hutchinson" email="c234tang@uwaterloo.ca" />
      <QuestionCard
        date={new Date()}
        title="Question Title"
        image=""
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, luctus id elementum, pellentesque ornare consectetur ac pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, luctus id elementum, pellentesque ornare consectetur ac pharetra. Lorem ipsum dolor sit amet,"
        tags={["Grade 2", "Unit #", "Lesson #"]}
      />
      <AdminUserTable adminUsers={ADMINUSERS} />
      <AddAdminModal />
    </div>
  );
};

export default ComponentLibrary;
