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

export const UPDATE_CLASS = gql`
  mutation UpdateClass($classroomId: ID!, $classObj: ClassRequestDTO!) {
    updateClass(id: $classroomId, classObj: $classObj) {
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

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $studentId: ID!
    $classId: ID!
    $student: StudentRequestDTO!
  ) {
    updateStudent(studentId: $studentId, classId: $classId, student: $student) {
      id
    }
  }
`;

export const ARCHIVE_CLASS = gql`
  mutation ArchiveClass($classId: ID!) {
    archiveClass(id: $classId) {
      id
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation DeleteClass($classId: ID!) {
    deleteClass(classId: $classId)
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($classId: ID!, $studentId: ID!) {
    deleteStudent(classId: $classId, studentId: $studentId)
  }
`;
