import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_CLASS_STUDENTS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { ClassStudentData } from "../../../../APIClients/types/ClassClientTypes";
import { filterStudentsBySearch } from "../../../../utils/ClassroomUtils";
import { sortArray } from "../../../../utils/GeneralUtils";
import EmptyClassStudentsMessage from "../../../common/info/messages/EmptyClassStudentsMessage";
import QueryStateHandler from "../../../common/QueryStateHandler";
import SearchableTablePage from "../../../common/table/SearchableTablePage";
import SearchBar from "../../../common/table/SearchBar";
import type { SortOrder } from "../../../common/table/SortMenu";
import SortMenu from "../../../common/table/SortMenu";
import useSortProperty from "../../../common/table/useSortProperty";
import StudentsTable from "../../../teacher/student-management/view-students/StudentsTable";

const SORT_PROPERTIES = ["firstName", "lastName", "studentNumber"] as const;

type DisplayClassroomStudentsPageProps = {
  onCreateStudent: () => void;
};

const DisplayClassroomStudentsPage = ({
  onCreateStudent,
}: DisplayClassroomStudentsPageProps) => {
  const [search, setSearch] = useState("");
  const [sortProperty, setSortProperty] = useSortProperty(
    "firstName",
    SORT_PROPERTIES,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");

  const { classroomId } = useParams<{ classroomId: string }>();
  const { data, loading, error } = useQuery<{ class: ClassStudentData }>(
    GET_CLASS_STUDENTS_BY_ID,
    {
      variables: { classroomId },
    },
  );
  const isEmpty = (data?.class?.students?.length ?? 0) === 0;

  const searchedStudents = useMemo(() => {
    if (!data?.class?.students) return [];
    return filterStudentsBySearch(data?.class?.students, search);
  }, [data?.class?.students, search]);

  const students = React.useMemo(() => {
    return sortArray(searchedStudents, sortProperty, sortOrder);
  }, [searchedStudents, sortProperty, sortOrder]);

  return (
    <QueryStateHandler error={error} loading={loading}>
      <SearchableTablePage
        nameOfTableItems="students"
        noResults={isEmpty}
        noResultsComponent={
          <EmptyClassStudentsMessage
            isActive={data?.class.isActive}
            onClick={onCreateStudent}
          />
        }
        resultsLength={students.length}
        search={search}
        searchBarComponent={<SearchBar onSearch={setSearch} />}
        sortMenuComponent={
          <SortMenu
            initialSortOrder="descending"
            labels={["first name", "last name", "student ID"]}
            onSortOrder={setSortOrder}
            onSortProperty={setSortProperty}
            properties={SORT_PROPERTIES}
          />
        }
        tableComponent={
          <StudentsTable
            classId={classroomId}
            isClassActive={!!data?.class.isActive}
            students={students}
          />
        }
      />
    </QueryStateHandler>
  );
};

export default DisplayClassroomStudentsPage;
