import React from "react";
import { Center } from "@chakra-ui/react";

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
  return (
    <Center
      backgroundColor="blue.50"
      borderRadius="1rem"
      color="blue.300"
      minWidth="100%"
      pb={14}
    >
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
