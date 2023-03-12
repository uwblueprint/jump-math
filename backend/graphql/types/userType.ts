import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    Teacher
    Admin
  }

  enum UserGradeEnum {
    K
    GRADE_1
    GRADE_2
    GRADE_3
    GRADE_4
    GRADE_5
    GRADE_6
    GRADE_7
    GRADE_8
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    grades: [UserGradeEnum]
    currentlyTeachingJM: Boolean
  }

  type TeacherDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    grades: [UserGradeEnum]
    currentlyTeachingJM: Boolean
    school: String!
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    password: String!
    grades: [UserGradeEnum]
    currentlyTeachingJM: Boolean
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    grades: [UserGradeEnum]
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
