import React from "react";

import type { StudentForm } from "../../../../types/ClassroomTypes";
import type { TableRow } from "../../../common/table/Table";
import { Table } from "../../../common/table/Table";

import EditStudentPopover from "./EditStudentPopover";

interface StudentsTableProps {
  students: StudentForm[];
}

const StudentsTable = ({
  students,
}: StudentsTableProps): React.ReactElement => {
  const headers = ["First Name", "Last Name", "Student ID"];
  const rows: TableRow[] = students.map((student) => ({
    values: [student.firstName, student.lastName, student.studentNumber],
    menu: <EditStudentPopover />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default StudentsTable;
