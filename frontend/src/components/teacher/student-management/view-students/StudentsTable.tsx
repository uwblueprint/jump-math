import React from "react";

import type { StudentResponse } from "../../../../APIClients/types/ClassClientTypes";
import type { TableRow } from "../../../common/table/Table";
import { Table } from "../../../common/table/Table";

import EditStudentPopover from "./EditStudentPopover";

interface StudentsTableProps {
  students: StudentResponse[];
  classId: string;
}

const StudentsTable = ({
  students,
  classId,
}: StudentsTableProps): React.ReactElement => {
  const headers = ["First Name", "Last Name", "Student ID"];
  const rows: TableRow[] = students.map((student) => ({
    values: [student.firstName, student.lastName, student.studentNumber],
    menu: <EditStudentPopover classId={classId} student={student} />,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default StudentsTable;
