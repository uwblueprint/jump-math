import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($user: CreateUserDTO!) {
    createUser(user: $user) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

export const REMOVE_USER = gql`
  mutation DeleteUserByEmail($email: String!) {
    deleteUserByEmail(email: $email)
  }
`;
