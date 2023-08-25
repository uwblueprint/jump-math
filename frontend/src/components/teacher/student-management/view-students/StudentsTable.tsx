import React from "react";

import type { StudentResponse } from "../../../../APIClients/types/ClassClientTypes";
import type { TableRow } from "../../../common/table/Table";
import { Table } from "../../../common/table/Table";

import EditStudentPopover from "./EditStudentPopover";

interface StudentsTableProps {
  students: StudentResponse[];
  classId: string;
  isClassActive: boolean;
}

const StudentsTable = ({
  students,
  classId,
  isClassActive,
}: StudentsTableProps): React.ReactElement => {
  const headers = ["First Name", "Last Name", "Student ID"];
  const rows: TableRow[] = students.map((student) => ({
    values: [student.firstName, student.lastName, student.studentNumber],
    menu: isClassActive ? (
      <EditStudentPopover classId={classId} student={student} />
    ) : undefined,
  }));

  return <Table headers={headers} rows={rows} />;
};
export default StudentsTable;
