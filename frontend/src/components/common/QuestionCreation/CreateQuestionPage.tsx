import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import CreateQuestionSidebar from "./CreateQuestionSidebar";
import { HOME_PAGE } from "../../../constants/Routes";

const CreateQuestionPage = (): React.ReactElement => {
  return (
    <Flex margin={0}>
      <CreateQuestionSidebar pageToNavigate={HOME_PAGE} />
      <Box flex="1">
        <VStack margin="3em 5em" align="left" color="grey.400">
          <Text textStyle="subtitle1" marginBottom={5}>
            Welcome to the question creation module.
          </Text>
          <Text textStyle="paragraph" marginBottom={3}>
            Click on any of the elements in the left-side and drag them into the
            creation area.
          </Text>
          <Text textStyle="paragraph">
            Select any of the blocks to reorder them. Hover over a block to
            delete it.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CreateQuestionPage;
