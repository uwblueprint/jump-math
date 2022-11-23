import { gql } from "apollo-server-express";

const testType = gql`
  enum QuestionTypeEnum {
    MULTIPLE_CHOICE
    NUMERIC_ANSWER
  }

  input MultipleChoiceMetadataInput {
    options: [String!]!
    answerIndex: Float!
  }

  type MultipleChoiceMetadata {
    options: [String!]!
    answerIndex: Float!
  }

  input NumericQuestionMetadataInput {
    answer: Float!
  }

  type NumericQuestionMetadata {
    answer: Float!
  }

  union QuestionMetadata = MultipleChoiceMetadata | NumericQuestionMetadata

  type Question {
    questionType: QuestionTypeEnum!
    questionPrompt: String!
    questionMetadata: QuestionMetadata!
  }

  input QuestionInput {
    questionType: QuestionTypeEnum!
    questionPrompt: String!
    questionMetadataMultipleChoice: MultipleChoiceMetadataInput
    questionMetadataNumericQuestion: NumericQuestionMetadataInput
  }

  type TestResponseDTO {
    id: ID!
    name: String!
    duration: Int!
    admin: UserDTO!
    questions: [Question]!
    grade: Int!
  }

  input TestRequestDTO {
    name: String!
    duration: Int!
    admin: ID!
    questions: [QuestionInput]!
    grade: Int!
  }

  extend type Query {
    tests: [TestResponseDTO]!
  }

  extend type Mutation {
    createTest(test: TestRequestDTO!): TestResponseDTO!
    updateTest(id: ID!, test: TestRequestDTO!): TestResponseDTO!
    deleteTestById(id: ID!): ID
  }
`;

export default testType;
