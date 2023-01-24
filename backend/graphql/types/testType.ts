import { gql } from "apollo-server-express";

const testType = gql`
  enum QuestionComponentTypeEnum {
    QUESTION_TEXT
    TEXT
    IMAGE
    MULTIPLE_CHOICE
    MULTI_SELECT
    SHORT_ANSWER
  }

  input QuestionTextMetadataInput {
    questionText: string;
  }

  type QuestionTextMetadata {
    questionText: string;
  }

  input TextMetadataInput {
    text: string;
  }

  type TextMetadata {
    text: string;
  }

  input ImageMetadataInput {
    src: string;
  }

  type ImageMetadata {
    src: string;
  }

  input MultipleChoiceMetadataInput {
    options: [String!]!
    answerIndex: Float!
  }

  type MultipleChoiceMetadata {
    options: [String!]!
    answerIndex: Float!
  }

  input MultiSelectMetadataInput {
    options: [String!]!
    answerIndices: [Float!]!
  }

  type MultiSelectMetadata {
    options: [String!]!
    answerIndices: [Float!]!
  }

  input ShortAnswerMetadataInput {
    answer: Float!
  }

  type ShortAnswerMetadata {
    answer: Float!
  }

  union QuestionMetadata = QuestionTextMetadata | TextMetadata | ImageMetadata | MultipleChoiceMetadata | MultiSelectMetadata | ShortAnswerMetadata

  type QuestionComponent {
    type: QuestionComponentTypeEnum!
    metadata: QuestionComponentMetadata!
  }

  type Question {
    question: QuestionComponent[];
  }

  input QuestionComponentInput {
    type: QuestionComponentTypeEnum!
    questionTextMetadata: QuestionTextMetadataInput;
    textMetadata: TextMetadataInput;
    imageMetadata: ImageMetadataInput;
    multipleChoiceMetadata: MultipleChoiceMetadataInput;
    multiSelectMetadata: MultiSelectMetadataInput;
    shortAnswerMetadata: ShortAnswerMetadataInput;
  }

  input QuestionInput {
    question: QuestionComponentInput[];
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
