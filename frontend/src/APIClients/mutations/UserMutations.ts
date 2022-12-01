import { gql } from "@apollo/client";

const ADD_USER = gql`
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

export default ADD_USER;
