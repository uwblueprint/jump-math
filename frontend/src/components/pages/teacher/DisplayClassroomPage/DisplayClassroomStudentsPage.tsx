import React, { useMemo, useState } from "react";

import { filterStudentsBySearch } from "../../../../utils/ClassroomUtils";
import { sortArray } from "../../../../utils/GeneralUtils";
import SearchableTablePage from "../../../common/table/SearchableTablePage";
import SearchBar from "../../../common/table/SearchBar";
import type { SortOrder } from "../../../common/table/SortMenu";
import SortMenu from "../../../common/table/SortMenu";
import StudentsTable from "../../../teacher/student-management/view-students/StudentsTable";

const MOCK_STUDENT_DATA = {
  students: [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      studentNumber: "123456",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      studentNumber: "654321",
    },
    {
      id: "3",
      firstName: "John",
      lastName: "Smith",
      studentNumber: "123456",
    },
    {
      id: "4",
      firstName: "Jane",
      lastName: "Smith",
      studentNumber: "654321",
    },
    {
      id: "5",
      firstName: "Jack",
      lastName: "Doe",
      studentNumber: "123456",
    },
    {
      id: "6",
      firstName: "Jill",
      lastName: "Doe",
      studentNumber: "654321",
    },
    {
      id: "7",
      firstName: "Jack",
      lastName: "Smith",
      studentNumber: "123456",
    },
    {
      id: "8",
      firstName: "Jill",
      lastName: "Smith",
      studentNumber: "654321",
    },
    {
      id: "9",
      firstName: "John",
      lastName: "Deere",
      studentNumber: "123456",
    },
    {
      id: "10",
      firstName: "Jane",
      lastName: "Deere",
      studentNumber: "654321",
    },
    {
      id: "11",
      firstName: "Jack",
      lastName: "Deere",
      studentNumber: "123456",
    },
    {
      id: "12",
      firstName: "Jill",
      lastName: "Deere",
      studentNumber: "654321",
    },
  ],
};

const DisplayClassroomStudentsPage = () => {
  const [search, setSearch] = useState("");
  const [sortProperty, setSortProperty] = useState("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");

  const data = MOCK_STUDENT_DATA;
  const isEmpty = data.students.length === 0;

  const searchedStudents = useMemo(() => {
    return filterStudentsBySearch(data.students, search);
  }, [data.students, search]);

  const students = React.useMemo(() => {
    return sortArray(searchedStudents, sortProperty, sortOrder);
  }, [searchedStudents, sortProperty, sortOrder]);

  return (
    <SearchableTablePage
      nameOfTableItems="students"
      noResults={isEmpty}
      search={search}
      searchBarComponent={<SearchBar onSearch={setSearch} />}
      searchLength={students.length}
      sortMenuComponent={
        <SortMenu
          initialSortOrder="descending"
          labels={["first name", "last name", "student ID"]}
          onSortOrder={setSortOrder}
          onSortProperty={setSortProperty}
          properties={["firstName", "lastName", "studentNumber"]}
        />
      }
      tableComponent={<StudentsTable students={students} />}
    />
  );
};

export default DisplayClassroomStudentsPage;
