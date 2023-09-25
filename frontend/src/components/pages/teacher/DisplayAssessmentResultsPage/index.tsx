import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

import { GET_TEST_SESSION_TITLE } from "../../../../APIClients/queries/TestSessionQueries";
import type { TestSessionTitleData } from "../../../../APIClients/types/TestSessionClientTypes";
import checkFeatureFlag from "../../../../checkFeatureFlag";
import * as Routes from "../../../../constants/Routes";
import RedirectTo from "../../../auth/RedirectTo";
import BackButton from "../../../common/navigation/BackButton";
import RouterTabs from "../../../common/navigation/RouterTabs";
import NotFound from "../../NotFound";

import DisplayAssessmentResultsByStudentPage from "./DisplayAssessmentResultsByStudentPage";
import DisplayAssessmentResultsSummaryPage from "./DisplayAssessmentResultsSummaryPage";

const getTabConfig = (isTeacherDataVizEnabled: boolean) => [
  ...(isTeacherDataVizEnabled
    ? [
        {
          name: "Summary",
          path: Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE(),
          Component: DisplayAssessmentResultsSummaryPage,
        },
      ]
    : []),
  {
    name: "Student",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE(),
    Component: DisplayAssessmentResultsByStudentPage,
  },
  {
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_PAGE(),
    exact: true,
    element: (
      <RedirectTo
        pathname={
          isTeacherDataVizEnabled
            ? Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE
            : Routes.DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE
        }
      />
    ),
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const getLocationState = (
  state: unknown,
): { returnTo?: string; sessionTitle?: string } => ({
  returnTo: undefined,
  sessionTitle: undefined,
  ...(typeof state === "object" ? state : {}),
});

const DisplayAssessmentResults = () => {
  const { state } = useLocation();
  const { returnTo, sessionTitle } = getLocationState(state);

  // We need to fetch the test session title if we don't have it yet.
  // This could happen if the user navigates directly to this page rather
  // than from the test session list.
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data } = useQuery<{
    testSession: TestSessionTitleData;
  }>(GET_TEST_SESSION_TITLE, {
    variables: { id: sessionId },
    skip: !!sessionTitle,
  });

  const isTeacherDataVizEnabled = checkFeatureFlag("ENABLE_TEACHER_DATA_VIZ");
  const TAB_CONFIG = useMemo(
    () => getTabConfig(isTeacherDataVizEnabled),
    [isTeacherDataVizEnabled],
  );

  const displayTitle = data?.testSession.test.name ?? sessionTitle;
  return (
    <Flex direction="column" flex="1" gap={8}>
      <Text as="h1" color="blue.300" textStyle="header4">
        <BackButton returnTo={returnTo} />
        <Skeleton as="span" isLoaded={!!displayTitle} ml={6}>
          <Box as="span">{displayTitle ?? "Loading..."}</Box>
        </Skeleton>
      </Text>
      <RouterTabs routes={TAB_CONFIG} />
    </Flex>
  );
};

export default DisplayAssessmentResults;
