import { gql } from "@apollo/client";

export const CREATE_TEST_SESSION = gql`
  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {
    createTestSession(testSession: $testSession) {
      id
    }
  }
`;

export const UPDATE_TEST_SESSION = gql`
  mutation UpdateTestSession($id: ID!, $testSession: TestSessionRequestDTO!) {
    updateTestSession(id: $id, testSession: $testSession) {
      id
    }
  }
`;

export const SUBMIT_TEST = gql`
  mutation CreateTestSessionResult(
    $testSessionId: ID!
    $result: ResultRequestDTO!
  ) {
    createTestSessionResult(id: $testSessionId, result: $result) {
      id
    }
  }
`;

export const DELETE_TEST_SESSION = gql`
  mutation DeleteTestSession($id: ID!) {
    deleteTestSession(id: $id)
  }
`;
