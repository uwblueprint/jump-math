import gql from "graphql-tag";

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
    userByEmail(email: String!): UserDTO!
    usersByRole(role: String!): [UserDTO!]!
    teachers: [TeacherDTO]
  }

  extend type Mutation {
    createUser(user: CreateUserDTO!): UserDTO!
    deleteUserByEmail(email: String!): ID
  }
`;

export default userType;
