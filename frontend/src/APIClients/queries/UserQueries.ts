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

export const GET_USER_VERIFICATION_STATUS = gql`
  query GetUserVerificationStatus($id: ID!) {
    userVerificationStatus(id: $id) {
      id
      email
      isVerified
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
      role
      isVerified
    }
  }
`;

export const GET_ALL_TEACHERS = gql`
  query GetAllTeachers {
    teachers {
      id
      firstName
      lastName
      email
      school
    }
  }
`;
