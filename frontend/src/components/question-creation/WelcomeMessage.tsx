import React from "react";
import { Text } from "@chakra-ui/react";

const WelcomeMessage = (): React.ReactElement => (
  <>
    <Text marginBottom={5} textStyle="subtitle1">
      Welcome to the question creation module.
    </Text>
    <Text marginBottom={3} textStyle="paragraph">
      Click on any of the elements in the left-side and drag them into the
      creation area.
    </Text>
    <Text textStyle="paragraph">
      Select any of the blocks to reorder them. Hover over a block to delete it.
    </Text>
  </>
);

export default WelcomeMessage;
