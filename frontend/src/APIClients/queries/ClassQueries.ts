import { gql } from "@apollo/client";

export const GET_CLASS_BY_TEST_SESSION = gql`
  query ClassByTestSession($testSessionId: ID!) {
    classByTestSession(testSessionId: $testSessionId) {
      id
      students {
        id
        firstName
        lastName
        studentNumber
      }
    }
  }
`;

export const GET_CLASSES_BY_TEACHER = gql`
  query ClassesByTeacher($teacherId: ID!) {
    classesByTeacher(teacherId: $teacherId) {
      id
      students {
        id
        firstName
        lastName
        studentNumber
      }
    }
  }
`;
