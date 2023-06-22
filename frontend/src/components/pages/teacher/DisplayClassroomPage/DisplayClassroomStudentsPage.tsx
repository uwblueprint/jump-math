import React from "react";

import StudentsTable from "../../../teacher/student-management/view-students/StudentsTable";

const MOCK_STUDENTS = [
  {
    firstName: "John",
    lastName: "Doe",
    studentNumber: 123456,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: 654321,
  },
];

const DisplayClassroomStudentsPage = () => {
  return <StudentsTable students={MOCK_STUDENTS} />;
};

export default DisplayClassroomStudentsPage;
