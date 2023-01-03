import { gql } from "@apollo/client";

const IS_AUTHORIZED_BY_EMAIL = gql`
  query IsAuthorizedByEmail($accessToken: String!, $requestedEmail: String!) {
    isAuthorizedByEmail(
      accessToken: $accessToken
      requestedEmail: $requestedEmail
    )
  }
`;

export default IS_AUTHORIZED_BY_EMAIL;
