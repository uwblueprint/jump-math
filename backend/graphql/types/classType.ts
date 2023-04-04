import { gql } from "apollo-server-express";

const classType = gql`
  input StudentRequestDTO {
    firstName: String!
    lastName: String!
    studentNumber: String
  }

  type StudentResponseDTO {
    id: String!
    firstName: String!
    lastName: String!
    studentNumber: String
  }

  type ClassRequestDTO {
    className: String!
    schoolYear: Int!;
    gradeLevel: [GradeEnum]!
    teacher: String!
    testSessions: [String]!
  }

  type ClassResponseDTO {
    id: String!
    className: String!
    schoolYear: Int!
    gradeLevel: [GradeEnum]!
    teacher: UserDTO
    testSessions: [TestSessionResponseDTO]!
    students: [StudentResponseDTO]!
  }

  extend type Mutation {
    createClass(
      class: ClassRequestDTO!
    ): ClassResponseDTO!
  }

  extend type Mutation {
    createStudent(
      student: StudentRequestDTO!
      classId: String!
    ): ClassResponseDTO!
  }
`;

export default classType;
