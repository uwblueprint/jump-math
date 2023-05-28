import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";

import { ArrowBackOutlineIcon, LeftArrowIcon } from "../../../../assets/icons";
import * as Routes from "../../../../constants/Routes";
import RouterTabs from "../../../common/RouterTabs";
import NotFound from "../../NotFound";

import DisplayAssessmentResultsByStudentPage from "./DisplayAssessmentResultsByStudentPage";
import DisplayAssessmentResultsSummaryPage from "./DisplayAssessmentResultsSummaryPage";

const TAB_CONFIG = [
  {
    name: "Summary",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE,
    component: DisplayAssessmentResultsSummaryPage,
  },
  {
    name: "Student",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE,
    component: DisplayAssessmentResultsByStudentPage,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const DisplayAssessmentResults = () => {
  const assessmentName = "Grade 5 Ontario Pre-Term Assessment";
  return (
    <Flex direction="column" gap={8}>
      <Text as="h1" color="blue.300" textStyle="header4">
        <IconButton
          aria-label="Back"
          icon={<LeftArrowIcon h={8} w={8} />}
          minW={0}
          mr={6}
        />
        {assessmentName}
      </Text>
      <RouterTabs routes={TAB_CONFIG} />
    </Flex>
  );
};

export default DisplayAssessmentResults;
