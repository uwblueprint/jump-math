import { gql } from "@apollo/client";

export const CREATE_CLASS = gql`
  mutation CreateClass($classObj: ClassRequestDTO!) {
    createClass(classObj: $classObj) {
      id
      className
      schoolYear
      gradeLevel
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($student: StudentRequestDTO!, $classId: String!) {
    createStudent(student: $student, classId: $classId) {
      id
    }
  }
`;
