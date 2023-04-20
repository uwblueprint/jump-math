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

  input ClassRequestDTO {
    className: String!
    schoolYear: Int!
    gradeLevel: GradeEnum!
    teacher: String!
  }

  type ClassResponseDTO {
    id: String!
    className: String!
    schoolYear: Int!
    gradeLevel: GradeEnum!
    teacher: UserDTO
    testSessions: [TestSessionResponseDTO]!
    students: [StudentResponseDTO]!
  }

  extend type Mutation {
    createClass(classObj: ClassRequestDTO!): ClassResponseDTO!
    createStudent(
      student: StudentRequestDTO!
      classId: String!
    ): ClassResponseDTO!
  }
`;

export default classType;
