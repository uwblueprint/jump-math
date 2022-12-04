import { gql } from "@apollo/client";

const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($role: String!) {
    usersByRole(role: $role) {
      id
      firstName
      lastName
      email
    }
  }
`;

export default GET_USERS_BY_ROLE;
