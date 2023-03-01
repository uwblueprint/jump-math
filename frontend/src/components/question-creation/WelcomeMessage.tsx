import React from "react";
import { Text } from "@chakra-ui/react";

const WelcomeMessage = (): React.ReactElement => (
  <>
    <Text textStyle="subtitle1" marginBottom={5}>
      Welcome to the question creation module.
    </Text>
    <Text textStyle="paragraph" marginBottom={3}>
      Click on any of the elements in the left-side and drag them into the
      creation area.
    </Text>
    <Text textStyle="paragraph">
      Select any of the blocks to reorder them. Hover over a block to delete it.
    </Text>
  </>
);

export default WelcomeMessage;
