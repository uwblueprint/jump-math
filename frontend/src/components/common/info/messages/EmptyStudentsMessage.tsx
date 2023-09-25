import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayStudentsIllustration from "../../../../assets/illustrations/display-students.svg";
import MessageContainer from "../MessageContainer";

type EmptyStudentsMessageProps = {
  onClick?: () => void;
};

const EmptyStudentsMessage = ({
  onClick,
}: EmptyStudentsMessageProps): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles}>
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonText="Add a student"
        image={DisplayStudentsIllustration}
        onClick={onClick}
        paragraphs={["Click on the button below to add your first student."]}
        subtitle="You currently have no students."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyStudentsMessage;
