import React from "react";
import { useHistory } from "react-router-dom";
import { Center, useStyleConfig } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../../assets/icons";
import DisplayAssessmentsIllustration from "../../../../assets/illustrations/display-assessments.svg";
import * as Routes from "../../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptyClassroomsGoToPageMessage = (): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  const history = useHistory();
  const onClick = () =>
    history.push(Routes.CLASSROOMS_PAGE, { openAddClassroomModal: true });

  return (
    <Center __css={styles} pb={14}>
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonText="Go to Classrooms"
        image={DisplayAssessmentsIllustration}
        onClick={onClick}
        paragraphs={["You currently have no classrooms."]}
        subtitle="Please go to the Classrooms page to add a classroom."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyClassroomsGoToPageMessage;
