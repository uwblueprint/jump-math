import { gql } from "@apollo/client";

const CREATE_TEST_SESSION = gql`
  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {
    createTestSession(testSession: $testSession) {
      id
    }
  }
`;

export default CREATE_TEST_SESSION;
