import { gql } from "@apollo/client";

export const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($role: String!) {
    usersByRole(role: $role) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;
