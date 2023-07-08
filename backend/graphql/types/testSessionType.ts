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
    notes: String
  }

  input TestSessionRequestDTO {
    test: ID!
    teacher: ID!
    school: ID!
    class: ID!
    accessCode: String!
    startDate: Date!
    endDate: Date!
    notes: String
  }

  extend type Query {
    testSession(id: ID!): TestSessionResponseDTO!
    testSessions: [TestSessionResponseDTO]!
    testSessionByAccessCode(accessCode: String!): TestSessionResponseDTO!
    testSessionsByTeacherId(teacherId: ID!): [TestSessionResponseDTO!]!
    getTop5StudentsByTestSessionId(id: ID!): [String!]
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
