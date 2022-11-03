import { gql } from "apollo-server-express";

const testType = gql`
  enum QuestionTypeEnum {
    MULTIPLE_CHOICE
    NUMERIC_ANSWER
  }

  input MultipleChoiceMetadataInput {
    options: [String!]!
    answerIndex: Int!
  }

  type MultipleChoiceMetadata {
    options: [String!]!
    answerIndex: Int!
  }

  input NumericQuestionMetadataInput {
    answer: Int!
  }

  type NumericQuestionMetadata {
    answer: Int!
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
    questionMetadataMultipleChoice: MultipleChoiceMetadataInput!
    questionMetadataNumericQuestion: NumericQuestionMetadataInput!
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
    questions: [QuestionInput]!
    grade: Int!
  }

  extend type Query {
    tests: [TestResponseDTO]!
  }

  extend type Mutation {
    createTest(test: CreateTestRequestDTO!): TestResponseDTO!
    updateTest(id: ID!, test: CreateTestRequestDTO!): TestResponseDTO!
    deleteTestById(id: ID!): ID
  }
`;

export default testType;
