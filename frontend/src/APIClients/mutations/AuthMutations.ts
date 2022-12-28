import { gql } from "@apollo/client";

const REGISTER_TEACHER = gql`
  mutation Signup_Register_Teacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
      role: "Teacher"
    ) {
      id
      firstName
      lastName
      email
      role
      accessToken
    }
  }
`;

export default REGISTER_TEACHER;
