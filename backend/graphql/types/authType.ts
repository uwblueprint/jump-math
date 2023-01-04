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

  input RegisterUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    register(user: RegisterUserDTO!, role: String!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
    verifyEmail(oobCode: String!): String!
    verifyPasswordReset(oobCode: String!): String!
    confirmPasswordReset(newPassword: String!, oobCode: String!): Boolean!
  }
`;

export default authType;
