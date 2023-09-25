import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayStudentsIllustration from "../../../../assets/illustrations/display-students.svg";
import MessageContainer from "../MessageContainer";

type EmptyClassStudentsMessageProps = {
  onClick?: () => void;
  isActive?: boolean;
};

const EmptyClassStudentsMessage = ({
  onClick,
  isActive,
}: EmptyClassStudentsMessageProps): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles}>
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonText={isActive ? "Add a student" : undefined}
        image={DisplayStudentsIllustration}
        onClick={onClick}
        paragraphs={
          isActive ? ["Click on the button below to add a student."] : []
        }
        subtitle="There are no students in this classroom."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyClassStudentsMessage;
