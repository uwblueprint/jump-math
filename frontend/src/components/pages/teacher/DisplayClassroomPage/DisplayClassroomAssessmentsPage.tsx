import React, { useMemo, useState } from "react";
import { Center, VStack } from "@chakra-ui/react";

import { sortArray } from "../../../../utils/GeneralUtils";
import {
  getSessionStatus,
  getSessionTargetDate,
} from "../../../../utils/TestSessionUtils";
import EmptySessionsMessage from "../../../common/info/messages/EmptySessionsMessage";
import Pagination from "../../../common/table/Pagination";
import SearchableTablePage from "../../../common/table/SearchableTablePage";
import SearchBar from "../../../common/table/SearchBar";
import SortMenu from "../../../common/table/SortMenu";
import usePaginatedData from "../../../common/table/usePaginatedData";
import useSortProperty from "../../../common/table/useSortProperty";
import TestSessionListItem from "../../../teacher/view-sessions/TestSessionListItem";

const mockData = {
  sessions: [
    ...[...Array(20)].map((_, i) => ({
      id: i.toString(),
      accessCode: "086731",
      startDate: new Date("2023-05-01"),
      endDate: new Date("2023-08-31"),
      test: { name: "Number Recognition Assessment" },
    })),
    {
      id: "20",
      accessCode: "086731",
      startDate: new Date("2023-04-01"),
      endDate: new Date("2023-06-31"),
      test: { name: "Number Recognition Assessment 2" },
    },
    {
      id: "21",
      accessCode: "123456",
      startDate: new Date("2023-08-01"),
      endDate: new Date("2023-08-31"),
      test: { name: "Counting Assessment" },
    },
    {
      id: "22",
      accessCode: "123456",
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-07-31"),
      test: { name: "Counting Assessment 2" },
    },
    {
      id: "23",
      accessCode: "123456",
      stats: {
        mean: 3.5,
        median: 3,
        completionRate: 30,
        submissions: 10,
      },
      startDate: new Date("2021-08-01"),
      endDate: new Date("2021-08-31"),
      test: { name: "Assessment Name" },
    },
    {
      id: "24",
      accessCode: "123456",
      stats: {
        mean: 97.3,
        median: 3,
        completionRate: 37.1,
        submissions: 4930,
      },
      startDate: new Date("2022-08-01"),
      endDate: new Date("2022-08-31"),
      test: { name: "Assessment Name 2" },
    },
  ],
};

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

  const data = mockData;

  const formattedData = useMemo(() => {
    const now = new Date();
    return data?.sessions.map(
      ({ id, startDate, endDate, test, ...session }) => ({
        ...session,
        testSessionId: id,
        testName: test.name,
        status: getSessionStatus(startDate, endDate, now),
        targetDate: getSessionTargetDate(startDate, endDate, now),
      }),
    );
  }, [data]);

  const sortedData = useMemo(
    () => sortArray(formattedData, sortProperty, sortOrder),
    [formattedData, sortProperty, sortOrder],
  );

  const { paginatedData, totalPages, currentPage, setCurrentPage } =
    usePaginatedData(sortedData, ASSESSEMENTS_PER_PAGE);

  const tableComponent = (
    <VStack w="100%">
      {paginatedData?.map((session) => (
        <TestSessionListItem key={session.testSessionId} {...session} />
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
    <SearchableTablePage
      nameOfTableItems="assessments"
      noResults={paginatedData.length === 0}
      noResultsComponent={<EmptySessionsMessage />}
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
  );
};

export default DisplayClassroomAssessmentsPage;
