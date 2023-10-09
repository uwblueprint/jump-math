import React, { useMemo } from "react";
import { Box, Center, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import {
  TEST_SESSION_STATUSES,
  TestSessionStatus,
} from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import RedirectTo from "../../auth/RedirectTo";
import HeaderWithButton from "../../common/HeaderWithButton";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import RouterTabs from "../../common/navigation/RouterTabs";
import useRouteMatchParam from "../../common/navigation/useRouteMatchParams";
import QueryStateHandler from "../../common/QueryStateHandler";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import TestSessionTabContents from "../../teacher/view-sessions/TestSessionTabContents";
import type { FormattedAssessmentData } from "../../teacher/view-sessions/useAssessmentDataQuery";
import useAssessmentDataQuery from "../../teacher/view-sessions/useAssessmentDataQuery";
import NotFound from "../NotFound";

const TAB_CONFIG = (
  data: FormattedAssessmentData[] | undefined,
  statusSummary?: Record<TestSessionStatus, number>,
) => [
  ...TEST_SESSION_STATUSES.map((status) => ({
    name:
      titleCase(status) +
      (statusSummary?.[status] == null ? "" : ` (${statusSummary[status]})`),
    path: Routes.DISPLAY_ASSESSMENTS_BY_STATUS_PAGE(status.toLowerCase()),
    element: <TestSessionTabContents data={data} status={status} />,
  })),
  {
    path: Routes.DISPLAY_ASSESSMENTS_PAGE,
    exact: true,
    element: (
      <RedirectTo
        pathname={Routes.DISPLAY_ASSESSMENTS_BY_STATUS_PAGE(
          TestSessionStatus.ACTIVE.toLowerCase(),
        )}
      />
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const DisplayAssessmentsPage = (): React.ReactElement => {
  const currentTab = useRouteMatchParam(
    Routes.DISPLAY_ASSESSMENTS_BY_STATUS_PAGE(":status"),
    "status",
  )?.toUpperCase() as TestSessionStatus;

  const { loading, error, data, statusSummary } = useAssessmentDataQuery();

  const filteredData = useMemo(() => {
    return data?.filter((session) => session.status === currentTab);
  }, [data, currentTab]);

  const sortedData = useMemo(() => {
    const invertSort = currentTab === TestSessionStatus.PAST;
    return filteredData?.sort((a, b) => {
      return (
        (invertSort ? -1 : 1) *
        (a.targetDate.getTime() - b.targetDate.getTime())
      );
    });
  }, [filteredData, currentTab]);

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(sortedData);

  return (
    <>
      <VStack align="left">
        <HeaderWithButton
          buttonText="Add Assessment"
          showButton={!!data?.length}
          targetRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
          title="Assessments"
        />
      </VStack>
      <QueryStateHandler error={error} loading={loading}>
        {data?.length ? (
          <>
            <RouterTabs routes={TAB_CONFIG(paginatedData, statusSummary)} />
            {totalPages > 1 && (
              <Center>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  pagesCount={totalPages}
                />
              </Center>
            )}
          </>
        ) : (
          <Box mt={8}>
            <EmptySessionsMessage />
          </Box>
        )}
      </QueryStateHandler>
    </>
  );
};

export default DisplayAssessmentsPage;
