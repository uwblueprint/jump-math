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
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import RouterTabs from "../../common/navigation/RouterTabs";
import useRouteMatchParam from "../../common/navigation/useRouteMatchParams";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import TestSessionTabContents from "../../teacher/view-sessions/TestSessionTabContents";
import type { FormattedAssessmentData } from "../../teacher/view-sessions/useAssessmentDataQuery";
import useAssessmentDataQuery from "../../teacher/view-sessions/useAssessmentDataQuery";
import NotFound from "../NotFound";

const TAB_CONFIG = (data: FormattedAssessmentData[] | undefined) => [
  ...TEST_SESSION_STATUSES.map((status) => ({
    name: titleCase(status),
    path: Routes.DISPLAY_ASSESSMENTS_BY_STATUS_PAGE(status),
    element: <TestSessionTabContents data={data} status={status} />,
  })),
  {
    path: Routes.DISPLAY_ASSESSMENTS_PAGE,
    exact: true,
    element: (
      <RedirectTo
        pathname={Routes.DISPLAY_ASSESSMENTS_BY_STATUS_PAGE(
          TestSessionStatus.ACTIVE,
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

  const { loading, error, data } = useAssessmentDataQuery();

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
      <VStack align="left" mb={10}>
        <HeaderWithButton
          buttonText="Add Assessment"
          showButton={!!data?.length}
          targetRoute={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
          title="Assessments"
        />
      </VStack>

      {loading && (
        <Center flex="1" margin="15%">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Box>
          <ErrorState />
        </Box>
      )}
      {!loading &&
        !error &&
        (data?.length ? (
          <>
            <RouterTabs routes={TAB_CONFIG(paginatedData)} />
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
          <EmptySessionsMessage />
        ))}
    </>
  );
};

export default DisplayAssessmentsPage;
