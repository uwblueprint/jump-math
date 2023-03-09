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

  enum AssessmentTypeEnum {
    BEGINNING
    END
  }

  enum StatusEnum {
    DRAFT
    PUBLISHED
    ARCHIVED
    DELETED
  }

  input QuestionTextMetadataInput {
    questionText: String!
  }

  type QuestionTextMetadata {
    questionText: String!
  }

  input TextMetadataInput {
    text: String!
  }

  type TextMetadata {
    text: String!
  }

  input ImageMetadataInput {
    src: String!
  }

  type ImageMetadata {
    src: String!
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

  union QuestionComponentMetadata =
      QuestionTextMetadata
    | TextMetadata
    | ImageMetadata
    | MultipleChoiceMetadata
    | MultiSelectMetadata
    | ShortAnswerMetadata

  type QuestionComponent {
    type: QuestionComponentTypeEnum!
    metadata: QuestionComponentMetadata!
  }

  input QuestionComponentInput {
    type: QuestionComponentTypeEnum!
    questionTextMetadata: QuestionTextMetadataInput
    textMetadata: TextMetadataInput
    imageMetadata: ImageMetadataInput
    multipleChoiceMetadata: MultipleChoiceMetadataInput
    multiSelectMetadata: MultiSelectMetadataInput
    shortAnswerMetadata: ShortAnswerMetadataInput
  }

  type TestResponseDTO {
    id: ID!
    name: String!
    questions: [[QuestionComponent]]!
    grade: Int!
    assessmentType: AssessmentTypeEnum!
    curriculumCountry: String!
    curriculumRegion: String!
    status: StatusEnum!
  }

  input TestRequestDTO {
    name: String!
    questions: [[QuestionComponentInput]]!
    grade: Int!
    assessmentType: AssessmentTypeEnum!
    curriculumCountry: String!
    curriculumRegion: String!
    status: StatusEnum!
  }

  extend type Query {
    tests: [TestResponseDTO]!
  }

  extend type Mutation {
    createTest(test: TestRequestDTO!): TestResponseDTO!
    updateTest(id: ID!, test: TestRequestDTO!): TestResponseDTO!
    deleteTestById(id: ID!): ID
    publishTest(id: ID!): TestResponseDTO!
    duplicateTest(id: ID!): TestResponseDTO!
    deleteAssessment(id: ID!): ID
  }
`;

export default testType;
