import gql from "graphql-tag";

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
    startDate: Date!
    gradeLevel: GradeEnum!
    teacher: String!
  }

  type ClassResponseDTO {
    id: String!
    className: String!
    startDate: Date!
    gradeLevel: GradeEnum!
    teacher: UserDTO
    testSessions: [TestSessionResponseDTO]!
    students: [StudentResponseDTO]!
  }

  extend type Query {
    classByTestSession(testSessionId: ID!): ClassResponseDTO!
    classesByTeacher(teacherId: ID!): [ClassResponseDTO!]!
  }

  extend type Mutation {
    createClass(classObj: ClassRequestDTO!): ClassResponseDTO!
    createStudent(student: StudentRequestDTO!, classId: ID!): ClassResponseDTO!
  }
`;

export default classType;
