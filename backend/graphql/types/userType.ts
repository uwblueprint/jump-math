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
    grades: [GradeEnum]
    currentlyTeachingJM: Boolean
    class: [String]
  }

  type TeacherDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    grades: [GradeEnum]
    currentlyTeachingJM: Boolean
    school: String!
    class: [String]
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    password: String!
    grades: [GradeEnum]
    currentlyTeachingJM: Boolean
    class: [String]
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    grades: [GradeEnum]
    currentlyTeachingJM: Boolean
    class: [String]
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
