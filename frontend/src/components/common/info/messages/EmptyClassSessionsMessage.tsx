import React from "react";
import { Center, useStyleConfig } from "@chakra-ui/react";

import type { ClassOverviewData } from "../../../../APIClients/types/ClassClientTypes";
import { PlusOutlineIcon } from "../../../../assets/icons";
import DistributeAssessmentsIllustration from "../../../../assets/illustrations/distribute-assessments.svg";
import { DISTRIBUTE_ASSESSMENT_PAGE } from "../../../../constants/Routes";
import MessageContainer from "../MessageContainer";

const EmptyClassSessionsMessage = ({
  classMetadata,
  isActive,
}: {
  classMetadata?: ClassOverviewData;
  isActive?: boolean;
}): React.ReactElement => {
  const styles = useStyleConfig("Center", { variant: "emptyMessage" });
  return (
    <Center __css={styles} pb={14}>
      <MessageContainer
        buttonIcon={<PlusOutlineIcon />}
        buttonRoute={{
          pathname: DISTRIBUTE_ASSESSMENT_PAGE,
          state: classMetadata ? { class: classMetadata } : {},
        }}
        buttonText={isActive ? "Create new assessment" : undefined}
        image={DistributeAssessmentsIllustration}
        paragraphs={
          isActive ? ["Click on the button below to add an assessment."] : []
        }
        subtitle="There are no assessments in this classroom."
        textColor="blue.300"
      />
    </Center>
  );
};

export default EmptyClassSessionsMessage;
