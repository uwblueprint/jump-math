import { gql } from "@apollo/client";

export const CREATE_TEST_SESSION = gql`
  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {
    createTestSession(testSession: $testSession) {
      id
    }
  }
`;

export const DELETE_TEST_SESSION = gql`
  mutation DeleteTestSession($id: ID!) {
    deleteTestSession(id: $id)
  }
`;
