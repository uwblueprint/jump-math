import { gql } from "@apollo/client";

const CREATE_TEST_SESSION = gql`
  mutation CreateTestSession(
    $classId: String!
    $testSession: TestSessionRequestDTO!
  ) {
    createTestSession(classId: $classId, testSession: $testSession) {
      id
    }
  }
`;

export default CREATE_TEST_SESSION;
