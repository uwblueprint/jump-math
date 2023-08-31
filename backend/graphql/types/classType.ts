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

  type TestableStudentsDTO {
    id: String!
    className: String!
    students: [StudentResponseDTO]!
  }

  input ClassQuerySort {
    updatedAt: SortDirection
  }

  input ClassQueryOptions {
    limit: Int
    skip: Int
    sort: ClassQuerySort
    excludeArchived: Boolean
  }

  extend type Query {
    class(id: ID!): ClassResponseDTO!
    testableStudentsByTestSessionId(testSessionId: ID!): TestableStudentsDTO!
    classesByTeacher(
      teacherId: ID!
      queryOptions: ClassQueryOptions
    ): [ClassResponseDTO!]!
  }

  extend type Mutation {
    createClass(classObj: ClassRequestDTO!): ClassResponseDTO!
    updateClass(id: ID!, classObj: ClassRequestDTO!): ClassResponseDTO!
    createStudent(student: StudentRequestDTO!, classId: ID!): ClassResponseDTO!
    updateStudent(
      studentId: ID!
      classId: ID!
      student: StudentRequestDTO!
    ): ClassResponseDTO!
    deleteClass(classId: ID!): ID
    archiveClass(id: ID!): ClassResponseDTO!
    deleteStudent(classId: ID!, studentId: ID!): ID!
  }
`;

export default classType;
