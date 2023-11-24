import React, { useMemo, useState } from "react";
import { Divider, Flex, OrderedList, VStack } from "@chakra-ui/react";

import type { StudentResponse } from "../../../../APIClients/types/ClassClientTypes";
import { includesIgnoreCase } from "../../../../utils/GeneralUtils";
import SearchBar from "../../../common/table/SearchBar";
import SortMenu from "../../../common/table/SortMenu";

import StudentListItem from "./StudentListItem";

type Student = Pick<StudentResponse, "id" | "firstName" | "lastName"> & {
  isViewed: boolean;
};
type StudentListProps = {
  students: Student[];
  selectedStudentId?: string;
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
    <Flex direction="column" height="100%" w="sm">
      <Flex alignItems="center" justifyContent="space-between" mb={4} p={1}>
        <SearchBar onSearch={setSearch} search={search} />
        <SortMenu labels={[]} onSortOrder={setSortDirection} properties={[]} />
      </Flex>
      <OrderedList
        flex={1}
        listStyleType="none"
        m={0}
        maxH="100%"
        overflow="auto"
        p={1}
      >
        <VStack
          alignItems="stretch"
          divider={<Divider borderColor="grey.100" />}
          spacing={0}
        >
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
