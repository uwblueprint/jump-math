import React from "react";
import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import Page from "../../types/PageTypes";
import StudentDashboardInfo from "../../types/StudentDashboardInfoTypes";
import Logout from "../auth/Logout";

import HomeButton from "./HomeButton";
import NavbarItem from "./NavbarItem";

interface NavbarProps {
  data: Page[] | StudentDashboardInfo;
}

const Navbar = ({ data }: NavbarProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        {Array.isArray(data) ? (
          <>
            <Spacer />
            <HStack>
              {data.map((page, index) => (
                <NavbarItem key={index} page={page} />
              ))}
              <Logout />
            </HStack>
          </>
        ) : (
          <VStack align="left" marginLeft="2rem">
            <Box>
              <Text textStyle="subtitle1">{data.assessmentName}</Text>
            </Box>
            <HStack gap={15}>
              <Text textStyle="smallerParagraph">{data.classroomName}</Text>
              <Text textStyle="smallerParagraph">
                Est. Length: {data.estimatedTime}
              </Text>
            </HStack>
          </VStack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
