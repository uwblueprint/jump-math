import { gql } from "@apollo/client";

const GET_TEST_SESSION_BY_ACCESS_CODE = gql`
  query TestSessionByAccessCode($accessCode: String!) {
    testSessionByAccessCode(accessCode: $accessCode) {
      id
      accessCode
    }
  }
`;

export default GET_TEST_SESSION_BY_ACCESS_CODE;
