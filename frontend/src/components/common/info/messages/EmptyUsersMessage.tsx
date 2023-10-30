import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import DisplayStudentsIllustration from "../../../../assets/illustrations/display-students.svg";
import MessageContainer from "../MessageContainer";

const EmptyUsersMessage = ({ role }: { role: string }): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles}>
      <MessageContainer
        image={DisplayStudentsIllustration}
        paragraphs={[]}
        subtitle={`You currently have no ${role}s`}
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyUsersMessage;
