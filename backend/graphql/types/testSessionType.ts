import { gql } from "apollo-server-express";

const testSessionType = gql`
  enum GradingStatus {
    GRADED
    UNGRADED
  }

  scalar Date

  scalar NumberOrArrayOrNull

  type ResultResponseDTO {
    student: String!
    score: Float
    answers: [NumberOrArrayOrNull]!
    breakdown: [[Boolean]]!
    gradingStatus: GradingStatus!
  }

  input ResultRequestDTO {
    student: String!
    score: Float
    answers: NumberOrArrayOrNull
    breakdown: [[Boolean]]!
    gradingStatus: GradingStatus!
  }

  type TestSessionResponseDTO {
    id: ID!
    test: TestResponseDTO!
    teacher: UserDTO!
    school: SchoolResponseDTO!
    gradeLevel: Int!
    results: [ResultResponseDTO]
    accessCode: String!
    startTime: Date!
  }

  input TestSessionRequestDTO {
    test: ID!
    teacher: ID!
    school: ID!
    gradeLevel: Int!
    results: [ResultRequestDTO]
    accessCode: String!
    startTime: Date!
  }

  extend type Query {
    testSession(id: String!): TestSessionResponseDTO!
    testSessions: [TestSessionResponseDTO]!
    testSessionByAccessCode(accessCode: String!): TestSessionResponseDTO!
    testSessionsByTeacherId(teacherId: String!): [TestSessionResponseDTO!]!
  }

  extend type Mutation {
    createTestSession(
      classId: String!
      testSession: TestSessionRequestDTO!
    ): TestSessionResponseDTO!
  }
`;

export default testSessionType;
