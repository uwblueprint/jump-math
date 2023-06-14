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

  type ClassCard {
    id: String!
    activeAssessments: Int!
    assessmentCount: Int!
    gradeLevel: GradeEnum!
    className: String!
    studentCount: Int!
  }

  extend type Query {
    classByTestSession(testSessionId: ID!): ClassResponseDTO!
    classesByTeacher(teacherId: ID!): [ClassCard!]!
  }

  extend type Mutation {
    createClass(classObj: ClassRequestDTO!): ClassResponseDTO!
    createStudent(student: StudentRequestDTO!, classId: ID!): ClassResponseDTO!
  }
`;

export default classType;
