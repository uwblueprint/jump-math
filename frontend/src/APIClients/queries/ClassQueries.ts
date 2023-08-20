import { gql } from "@apollo/client";

export const GET_CLASS_DETAILS_BY_ID = gql`
  query ClassDetailsById($classroomId: ID!) {
    class(id: $classroomId) {
      id
      className
      startDate
      gradeLevel
    }
  }
`;

export const GET_CLASS_STUDENTS_BY_ID = gql`
  query ClassStudentsById($classroomId: ID!) {
    class(id: $classroomId) {
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

export const GET_CLASS_TEST_SESSIONS_BY_ID = gql`
  query ClassTestSessionsById($classroomId: ID!) {
    class(id: $classroomId) {
      id
      className
      testSessions {
        id
        test {
          name
        }
        startDate
        endDate
        accessCode
      }
    }
  }
`;

export const GET_CLASS_BY_TEST_SESSION = gql`
  query ClassByTestSession($testSessionId: ID!) {
    classByTestSession(testSessionId: $testSessionId) {
      id
      className
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
  query ClassesByTeacher($teacherId: ID!, $queryOptions: ClassQueryOptions) {
    classesByTeacher(teacherId: $teacherId, queryOptions: $queryOptions) {
      id
      startDate
      gradeLevel
      className
      testSessions {
        id
        startDate
        endDate
      }
      students {
        id
      }
    }
  }
`;
