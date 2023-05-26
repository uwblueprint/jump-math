import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
  OrderedList,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import { includesIgnoreCase } from "../../../utils/GeneralUtils";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

type StudentListItemProps = {
  firstName: string;
  lastName: string;
  isViewed: boolean;
  isSelected: boolean;
  onClick: () => void;
};

const StudentListItem = ({
  firstName,
  lastName,
  isViewed,
  isSelected,
  onClick,
}: StudentListItemProps) => {
  return (
    <ListItem>
      <Button
        _hover={{ bg: "grey.100" }}
        bg="grey.50"
        borderRadius={8}
        display="flex"
        onClick={onClick}
        p={4}
        variant="tertiary"
        w="100%"
      >
        <Box
          color={isSelected ? "blue.300" : "grey.400"}
          fontWeight={isSelected ? "700" : "400"}
        >{`${firstName} ${lastName}`}</Box>
        <Spacer />
        {isViewed && (
          <Box color="grey.200" fontWeight="400">
            Viewed
          </Box>
        )}
      </Button>
    </ListItem>
  );
};

type Student = StudentResponse & {
  isViewed: boolean;
};
type StudentListProps = {
  students: Student[];
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
};

const StudentList = ({
  students,
  selectedStudentId,
  setSelectedStudentId,
}: StudentListProps) => {
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  const searchedStudentsWithName = useMemo(
    () =>
      students
        .map((student) => ({
          ...student,
          name: `${student.firstName} ${student.lastName}`,
        }))
        .filter((student) => includesIgnoreCase(student.name, search)),
    [students, search],
  );

  const sortedStudents = useMemo(
    () =>
      searchedStudentsWithName.sort((a, b) =>
        sortDirection === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    [searchedStudentsWithName, sortDirection],
  );

  return (
    <Flex direction="column" height="100%" w="container.sm">
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <SearchBar onSearch={setSearch} />
        <SortMenu labels={[]} onSortOrder={setSortDirection} properties={[]} />
      </Flex>
      <OrderedList
        flex={1}
        listStyleType="none"
        m={0}
        maxH="100%"
        overflow="auto"
      >
        <VStack alignItems="stretch" divider={<Divider m="0 !important" />}>
          {sortedStudents.map(({ id, ...student }) => (
            <StudentListItem
              key={id}
              isSelected={id === selectedStudentId}
              onClick={() => setSelectedStudentId(id)}
              {...student}
            />
          ))}
        </VStack>
      </OrderedList>
    </Flex>
  );
};

export default StudentList;
