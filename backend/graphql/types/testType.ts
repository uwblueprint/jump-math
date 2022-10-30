import { gql } from "apollo-server-express";

const testType = gql`
  enum QuestionType {
    MULTIPLE_CHOICE
    NUMERIC_ANSWER
  }

  type MultipleChoiceMetadata {
    options: [String!]!
    answerIndex: Int!
  }

  type NumericQuestionMetadata {
    answer: Int!
  }

  union QuestionMetadata = MultipleChoiceMetadata | NumericQuestionMetadata

  type Question {
    questionType: QuestionType
    questionPrompt: String!
    questionMetadata: QuestionMetadata
  }

  type TestResponseDTO {
    id: ID!
    name: String!
    duration: Int!
    admin: UserDTO!
    questions: [Question]!
    grade: Int!
  }

  input CreateTestRequestDTO {
    name: String!
    duration: Int!
    admin: ID!
    questions: [Question]!
    grade: Int!
  }

  extend type Query {
    tests: [TestResponseDTO!]!
  }

  extend type Mutation {
    createTest(entity: CreateTestRequestDTO!): TestResponseDTO!
    updateTest(id: ID!, entity: CreateTestRequestDTO!): TestResponseDTO!
    deleteTestById(id: ID!): ID
  }
`;

export default testType;
