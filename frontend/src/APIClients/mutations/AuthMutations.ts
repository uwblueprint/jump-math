import { gql } from "@apollo/client";

export const REGISTER_TEACHER = gql`
  mutation Register_Teacher(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $grades: [GradeEnum!]!
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
      emailVerified
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($userId: ID!) {
    logout(userId: $userId)
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

export const CONFIRM_PASSWORD_RESET = gql`
  mutation ConfirmPasswordReset($newPassword: String!, $oobCode: String!) {
    confirmPasswordReset(newPassword: $newPassword, oobCode: $oobCode)
  }
`;

export const SEND_EMAIL_VERIFICATION_LINK = gql`
  mutation SendEmailVerificationLink($email: String!) {
    sendEmailVerificationLink(email: $email)
  }
`;
