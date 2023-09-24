import React, { useMemo } from "react";
import { Box, Center, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import { TestSessionStatus } from "../../../types/TestSessionTypes";
import HeaderWithButton from "../../common/HeaderWithButton";
import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";
import EmptySessionsMessage from "../../common/info/messages/EmptySessionsMessage";
import Pagination from "../../common/table/Pagination";
import usePaginatedData from "../../common/table/usePaginatedData";
import TestSessionTabs from "../../teacher/view-sessions/TestSessionTabs";
import useAssessmentDataQuery from "../../teacher/view-sessions/useAssessmentDataQuery";

const DisplayAssessmentsPage = (): React.ReactElement => {
  const [currentTab, setCurrentTab] = React.useState(TestSessionStatus.ACTIVE);

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
      {!!data?.length && !loading && !error && (
        <>
          <TestSessionTabs data={paginatedData} setCurrentTab={setCurrentTab} />
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
      )}
      {!data?.length && !loading && !error && <EmptySessionsMessage />}
    </>
  );
};

export default DisplayAssessmentsPage;
