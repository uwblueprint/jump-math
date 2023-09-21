import gql from "graphql-tag";

const authType = gql`
  type AuthDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    accessToken: String!
    emailVerified: Boolean
  }

  input SchoolMetadataInput {
    name: String!
    id: ID!
    country: String!
    city: String!
    district: String!
    address: String!
  }

  input RegisterTeacherDTO {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    grades: [GradeEnum!]!
    currentlyTeachingJM: Boolean!
    school: SchoolMetadataInput!
  }

  extend type Query {
    verifyPasswordResetCode(oobCode: String!): String!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    registerTeacher(user: RegisterTeacherDTO!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
    verifyEmail(oobCode: String!): String!
    confirmPasswordReset(newPassword: String!, oobCode: String!): Boolean!
    sendEmailVerificationLink(email: String!): Boolean!
  }
`;

export default authType;
