import { gql } from "apollo-server-express";

const authType = gql`
  type AuthDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    accessToken: String!
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
    grades: [String!]!
    currentlyTeachingJM: Boolean!
    school: SchoolMetadataInput!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    registerTeacher(user: RegisterTeacherDTO!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
    resetPasswordCode(email: String!): String!
    verifyEmail(oobCode: String!): String!
    verifyPasswordReset(oobCode: String!): String!
    confirmPasswordReset(newPassword: String!, oobCode: String!): Boolean!
  }
`;

export default authType;
