import { gql } from "@apollo/client";

export const CREATE_CLASS = gql`
  mutation CreateClass($classObj: ClassRequestDTO!) {
    createClass(classObj: $classObj) {
      id
      className
      startDate
      gradeLevel
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($student: StudentRequestDTO!, $classId: ID!) {
    createStudent(student: $student, classId: $classId) {
      id
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation DeleteClass($classId: ID!) {
    deleteClass(classId: $classId)
  }
`;
