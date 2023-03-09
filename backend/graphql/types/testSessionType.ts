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
    results: [ResultResponseDTO]!
    accessCode: String!
    startTime: Date!
  }

  extend type Query {
    testSessionByAccessCode(accessCode: String!): TestSessionResponseDTO
    allTestSessions: [TestSessionResponseDTO]!
    testSessionById(id: String!): TestSessionResponseDTO
  }
`;

export default testSessionType;
