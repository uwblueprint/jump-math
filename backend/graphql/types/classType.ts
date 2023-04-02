import { gql } from "apollo-server-express";

const classType = gql`
type StudentRequestDTO {
    firstName: String!;
    lastName: String!;
    studentNumber: String;
}

type StudentResponseDTO {
    id: String!;
    firstName: String!;
    lastName: String!;
    studentNumber: String;
  }

type ClassResponseDTO {
    id: String!;
    className: String!;
    schoolYear: Int!;
    gradeLevel: [GradeEnum]!;
    teacher: UserDTO;
    testSessions: [TestSessionResponseDTO]!;
    students: [StudentResponseDTO]!;
}

  extend type Mutation {
    createStudent(
      student: StudentRequestDTO!
      classId: String!
    ): ClassResponseDTO!
  }
`;

export default classType;
