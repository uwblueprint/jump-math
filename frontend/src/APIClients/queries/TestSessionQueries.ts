import { gql } from "@apollo/client";

export const GET_TEST_SESSION_BY_ACCESS_CODE = gql`
  query TestSessionByAccessCode($accessCode: String!) {
    testSessionByAccessCode(accessCode: $accessCode) {
      id
      test {
        id
      }
      notes
      startDate
      endDate
    }
  }
`;

export const GET_TEST_SESSION_BY_TEACHER_ID = gql`
  query TestSessionsByTeacherId($teacherId: String!) {
    testSessionsByTeacherId(teacherId: $teacherId) {
      id
      test {
        id
      }
    }
  }
`;
