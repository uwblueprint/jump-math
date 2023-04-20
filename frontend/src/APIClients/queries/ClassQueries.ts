import { gql } from "@apollo/client";

const GET_CLASS_BY_TEST_SESSION = gql`
  query ClassByTestSession($testSessionId: String!) {
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

export default GET_CLASS_BY_TEST_SESSION;
