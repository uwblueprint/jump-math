import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    Teacher
    Admin
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    grades: [String]
    currentlyTeachingJM: Boolean
  }

  type TeacherDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    grades: [String]
    currentlyTeachingJM: Boolean
    school: String!
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    password: String!
    grades: [String]
    currentlyTeachingJM: Boolean
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    grades: [String]
    currentlyTeachingJM: Boolean
  }

  extend type Query {
    userById(id: ID!): UserDTO!
    userByEmail(email: String!): UserDTO!
    users: [UserDTO!]!
    usersByRole(role: String!): [UserDTO!]!
    usersCSV: String!
    teachers: [TeacherDTO]
  }

  extend type Mutation {
    createUser(user: CreateUserDTO!): UserDTO!
    updateUser(id: ID!, user: UpdateUserDTO!): UserDTO!
    deleteUserById(id: ID!): ID
    deleteUserByEmail(email: String!): ID
  }
`;

export default userType;
