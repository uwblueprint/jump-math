import React from "react";
import { Center } from "@chakra-ui/react";

import MobileRedirectIllustration from "../../../assets/illustrations/mobile-redirect.svg";
import { HOME_PAGE } from "../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const MobileRedirectMessage = (): React.ReactElement => {
  return (
    <Center minHeight="100vh">
      <MessageContainer
        buttonRoute={HOME_PAGE}
        buttonText="Go to Home Page"
        image={MobileRedirectIllustration}
        paragraphs={[
          "Our application currently does not support mobile so we recommend that you use desktop instead",
        ]}
        subtitle="Oops!"
        textColor="blue.300"
      />
    </Center>
  );
};

export default MobileRedirectMessage;
