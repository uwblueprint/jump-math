import { gql } from "@apollo/client";

export const REGISTER_TEACHER = gql`
  mutation Register_Teacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $grades: [String!]!
    $currentlyTeachingJM: Boolean!
    $school: SchoolMetadataInput!
  ) {
    registerTeacher(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        grades: $grades
        currentlyTeachingJM: $currentlyTeachingJM
        school: $school
      }
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

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      role
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($userId: ID!) {
    logout(userId: $userId)
  }
`;

export const REFRESH = gql`
  mutation Refresh {
    refresh
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;
