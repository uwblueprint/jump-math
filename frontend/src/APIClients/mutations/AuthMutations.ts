import { gql } from "@apollo/client";

export const REGISTER_TEACHER = gql`
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

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($oobCode: String!) {
    verifyEmail(oobCode: $oobCode)
  }
`;

export const VERIFY_PASSWORD_RESET = gql`
  mutation VerifyPasswordReset($oobCode: String!) {
    verifyPasswordReset(oobCode: $oobCode)
  }
`;

export const CONFIRM_PASSWORD_RESET = gql`
  mutation VerifyPasswordReset($newPassword: String!, $oobCode: String!) {
    verifyPasswordReset(newPassword: $newpassword, oobCode: $oobCode)
  }
`;
