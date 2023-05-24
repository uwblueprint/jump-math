import gql from "graphql-tag";

const testSessionType = gql`
  type ResultResponseDTO {
    student: String!
    score: Float!
    answers: [[[Float]]]!
    breakdown: [[Boolean]]!
  }

  type ResultAndStudentResponseDTO {
    student: StudentResponseDTO!
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
    class: ClassResponseDTO!
    results: [ResultResponseDTO]
    accessCode: String!
    startDate: Date!
    endDate: Date!
    notes: String
  }

  type TestSessionAndStudentResponseDTO {
    id: ID!
    test: TestResponseDTO!
    teacher: UserDTO!
    school: SchoolResponseDTO!
    class: ClassResponseDTO!
    results: [ResultAndStudentResponseDTO]
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
    testSession(id: ID!): TestSessionAndStudentResponseDTO!
    testSessions: [TestSessionResponseDTO]!
    testSessionByAccessCode(accessCode: String!): TestSessionResponseDTO!
    testSessionsByTeacherId(teacherId: ID!): [TestSessionResponseDTO!]!
  }

  extend type Mutation {
    createTestSession(
      testSession: TestSessionRequestDTO!
    ): TestSessionResponseDTO!
    deleteTestSession(id: ID!): ID!
  }
`;

export default testSessionType;
