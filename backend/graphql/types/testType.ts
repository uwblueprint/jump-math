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

  enum GradeEnum {
    K
    GRADE_1
    GRADE_2
    GRADE_3
    GRADE_4
    GRADE_5
    GRADE_6
    GRADE_7
    GRADE_8
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

  scalar ImageMetadataInput

  type ImagePreviewMetadata {
    url: String!
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

  union QuestionComponentMetadataResponse =
      QuestionTextMetadata
    | TextMetadata
    | ImagePreviewMetadata
    | MultipleChoiceMetadata
    | MultiSelectMetadata
    | ShortAnswerMetadata

  type QuestionComponentResponse {
    type: QuestionComponentTypeEnum!
    metadata: QuestionComponentMetadataResponse!
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
    questions: [[QuestionComponentResponse]]!
    grade: GradeEnum!
    assessmentType: AssessmentTypeEnum!
    curriculumCountry: String!
    curriculumRegion: String!
    status: StatusEnum!
  }

  input TestRequestDTO {
    name: String!
    questions: [[QuestionComponentInput]]!
    grade: GradeEnum!
    assessmentType: AssessmentTypeEnum!
    curriculumCountry: String!
    curriculumRegion: String!
    status: StatusEnum!
  }

  extend type Query {
    test(id: ID!): TestResponseDTO!
    tests: [TestResponseDTO]!
  }

  extend type Mutation {
    createTest(test: TestRequestDTO!): TestResponseDTO!
    updateTest(id: ID!, test: TestRequestDTO!): TestResponseDTO!
    deleteTestById(id: ID!): ID
    publishTest(id: ID!): TestResponseDTO!
    duplicateTest(id: ID!): TestResponseDTO!
    unarchiveTest(id: ID!): TestResponseDTO!
    archiveTest(id: ID!): TestResponseDTO!
  }
`;

export default testType;
