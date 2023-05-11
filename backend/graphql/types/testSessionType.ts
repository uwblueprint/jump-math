import { gql } from "apollo-server-express";

const testSessionType = gql`
  scalar Date

  type ResultResponseDTO {
    student: String!
    score: Float!
    answers: [[[Float]]]!
    breakdown: [[Boolean]]!
  }

  input ResultRequestDTO {
    student: String!
    answers: [[[Float]]]!
  }

  type TestSessionResponseDTO {
    id: ID!
    test: TestResponseDTO!
    teacher: UserDTO!
    school: SchoolResponseDTO!
    results: [ResultResponseDTO]
    accessCode: String!
    startDate: Date!
    endDate: Date!
    notes: String
  }

  input TestSessionRequestDTO {
    test: ID!
    teacher: ID!
    school: ID!
    accessCode: String!
    startDate: Date!
    endDate: Date!
    notes: String
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
