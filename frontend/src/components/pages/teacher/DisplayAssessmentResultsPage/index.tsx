import React from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

import * as Routes from "../../../../constants/Routes";
import BackButton from "../../../common/BackButton";
import RouterTabs from "../../../common/RouterTabs";
import NotFound from "../../NotFound";

import DisplayAssessmentResultsByStudentPage from "./DisplayAssessmentResultsByStudentPage";
import DisplayAssessmentResultsSummaryPage from "./DisplayAssessmentResultsSummaryPage";

const TAB_CONFIG = [
  {
    name: "Summary",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE(),
    Component: DisplayAssessmentResultsSummaryPage,
  },
  {
    name: "Student",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE(),
    Component: DisplayAssessmentResultsByStudentPage,
  },
  {
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_PAGE(),
    exact: true,
    Component: () => {
      const { sessionId } = useParams<{ sessionId: string }>();
      const location = useLocation();
      return (
        <Redirect
          to={{
            pathname: Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE(sessionId),
            state: location.state,
          }}
        />
      );
    },
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const isValidLocationState = (state: any): state is { returnTo: string } => {
  return typeof state === "object" && state !== null && "returnTo" in state;
};

const DisplayAssessmentResults = () => {
  const { state } = useLocation();
  const returnTo = isValidLocationState(state) ? state.returnTo : undefined;

  const assessmentName = "Grade 5 Ontario Pre-Term Assessment";
  return (
    <Flex direction="column" gap={8}>
      <Text as="h1" color="blue.300" textStyle="header4">
        <BackButton returnTo={returnTo} size="xl" text="" />
        <Box as="span" ml={6}>
          {assessmentName}
        </Box>
      </Text>
      <RouterTabs routes={TAB_CONFIG} />
    </Flex>
  );
};

export default DisplayAssessmentResults;
