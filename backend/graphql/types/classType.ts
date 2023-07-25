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
    startDate: Date
    gradeLevel: GradeEnum!
    teacher: UserDTO
    testSessions: [TestSessionResponseDTO]!
    students: [StudentResponseDTO]!
    isActive: Boolean!
  }

  extend type Query {
    class(id: ID!): ClassResponseDTO!
    classByTestSession(testSessionId: ID!): ClassResponseDTO!
    classesByTeacher(teacherId: ID!, limit: Int): [ClassResponseDTO!]!
  }

  extend type Mutation {
    createClass(classObj: ClassRequestDTO!): ClassResponseDTO!
    updateClass(id: ID!, classObj: ClassRequestDTO!): ClassResponseDTO!
    createStudent(student: StudentRequestDTO!, classId: ID!): ClassResponseDTO!
    deleteClass(classId: ID!): ID
    archiveClass(id: ID!): ClassResponseDTO!
  }
`;

export default classType;
