import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Center, VStack } from "@chakra-ui/react";

import { GET_CLASS_TEST_SESSIONS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { ClassTestSessionData } from "../../../../APIClients/types/ClassClientTypes";
import { sortArray } from "../../../../utils/GeneralUtils";
import {
  filterTestSessionsBySearch,
  getSessionTargetDate,
} from "../../../../utils/TestSessionUtils";
import ErrorState from "../../../common/info/ErrorState";
import LoadingState from "../../../common/info/LoadingState";
import EmptyClassSessionsMessage from "../../../common/info/messages/EmptyClassSessionsMessage";
import Pagination from "../../../common/table/Pagination";
import SearchableTablePage from "../../../common/table/SearchableTablePage";
import SearchBar from "../../../common/table/SearchBar";
import SortMenu from "../../../common/table/SortMenu";
import usePaginatedData from "../../../common/table/usePaginatedData";
import useSortProperty from "../../../common/table/useSortProperty";
import TestSessionListItem from "../../../teacher/view-sessions/TestSessionListItem";

const ASSESSEMENTS_PER_PAGE = 5;
const SORT_PROPERTIES = ["testName", "status"] as const;

const DisplayClassroomAssessmentsPage = () => {
  const [search, setSearch] = useState("");
  const [sortProperty, setSortProperty] = useSortProperty(
    "testName",
    SORT_PROPERTIES,
  );
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "descending",
  );

  const { classroomId } = useParams<{ classroomId: string }>();
  const { data, loading, error } = useQuery<{ class: ClassTestSessionData }>(
    GET_CLASS_TEST_SESSIONS_BY_ID,
    {
      variables: { classroomId },
    },
  );

  const formattedData = useMemo(
    () =>
      data?.class.testSessions.map(
        ({ id, startDate, endDate, test, ...session }) => ({
          ...session,
          testSessionId: id,
          testId: test.id,
          testName: test.name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: getSessionTargetDate(startDate, endDate, session.status),
        }),
      ),
    [data],
  );

  const searchedData = useMemo(() => {
    if (!formattedData) return [];
    return filterTestSessionsBySearch(formattedData, search);
  }, [formattedData, search]);

  const sortedData = useMemo(
    () => sortArray(searchedData, sortProperty, sortOrder),
    [searchedData, sortProperty, sortOrder],
  );

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(sortedData, ASSESSEMENTS_PER_PAGE);

  const tableComponent = (
    <VStack w="100%">
      {paginatedData?.map((session) => (
        <TestSessionListItem
          key={session.testSessionId}
          {...session}
          classroomId={classroomId}
          classroomName={data?.class.className ?? ""}
          isReadOnly={!data?.class.isActive}
        />
      ))}
      {totalPages > 1 && (
        <Center>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pagesCount={totalPages}
          />
        </Center>
      )}
    </VStack>
  );

  return (
    <>
      {loading && (
        <Center flex="1" margin="15%">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Box height="100%" mt={10}>
          <ErrorState />
        </Box>
      )}
      {paginatedData && !error && !loading && (
        <SearchableTablePage
          nameOfTableItems="assessments"
          noResults={paginatedData.length === 0}
          noResultsComponent={
            <EmptyClassSessionsMessage
              classMetadata={{
                id: classroomId,
                className: data?.class.className ?? "",
              }}
              isActive={data?.class.isActive}
            />
          }
          search={search}
          searchBarComponent={<SearchBar onSearch={setSearch} />}
          searchLength={paginatedData.length}
          sortMenuComponent={
            <SortMenu
              initialSortOrder={sortOrder}
              labels={["Name", "Status"]}
              onSortOrder={setSortOrder}
              onSortProperty={setSortProperty}
              properties={SORT_PROPERTIES}
            />
          }
          tableComponent={tableComponent}
        />
      )}
    </>
  );
};

export default DisplayClassroomAssessmentsPage;
