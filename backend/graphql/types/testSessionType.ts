import gql from "graphql-tag";

const testSessionType = gql`
  type ResultResponseDTO {
    score: Float!
    percentile: Float!
    answers: [[[Float]]]!
    breakdown: [[Boolean]]!
  }

  type StudentResultResponseDTO {
    student: StudentResponseDTO!
    result: ResultResponseDTO
  }

  type TopAndBottomStudents {
    topFive: [String!]!
    bottomFive: [String!]!
  }

  input ResultRequestDTO {
    student: ID!
    answers: [[[Float]]]!
  }

  type TestSessionResponseDTO {
    id: ID!
    test: TestResponseDTO!
    teacher: UserDTO!
    school: SchoolResponseDTO!
    class: ClassResponseDTO!
    results: [StudentResultResponseDTO!]
    accessCode: String!
    startDate: Date!
    endDate: Date!
    status: TestSessionStatus!
    notes: String
  }

  input TestSessionRequestDTO {
    test: ID!
    teacher: ID!
    school: ID!
    class: ID!
    startDate: Date!
    endDate: Date!
    notes: String
  }

  extend type Query {
    testSession(id: ID!): TestSessionResponseDTO!
    testSessions: [TestSessionResponseDTO]!
    testSessionByAccessCode(accessCode: String!): TestSessionResponseDTO!
    testSessionsByTeacherId(
      teacherId: ID!
      limit: Int
    ): [TestSessionResponseDTO!]!
    getStudentLeaderBoard(id: ID!): TopAndBottomStudents!
  }

  extend type Mutation {
    createTestSession(
      testSession: TestSessionRequestDTO!
    ): TestSessionResponseDTO!
    createTestSessionResult(
      id: ID!
      result: ResultRequestDTO!
    ): TestSessionResponseDTO!
    deleteTestSession(id: ID!): ID!
  }
`;

export default testSessionType;
