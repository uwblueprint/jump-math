import { gql } from "@apollo/client";

export const PUBLISH_TEST = gql`
  mutation PublishTest($id: ID!) {
    publishTest(id: $id) {
      id
    }
  }
`;

export const DUPLICATE_TEST = gql`
  mutation DuplicateTest($id: ID!) {
    duplicateTest(id: $id) {
      id
    }
  }
`;

export const DELETE_TEST = gql`
  mutation DeleteTest($id: ID!) {
    deleteTest(id: $id)
  }
`;

export const UNARCHIVE_TEST = gql`
  mutation UnarchiveTest($id: ID!) {
    unarchiveTest(id: $id) {
      id
    }
  }
`;

export const ARCHIVE_TEST = gql`
  mutation ArchiveTest($id: ID!) {
    archiveTest(id: $id) {
      id
    }
  }
`;

export const CREATE_NEW_TEST = gql`
  mutation CreateTest($test: TestRequestDTO!) {
    createTest(test: $test) {
      id
      name
      questions {
        type
        metadata {
          ... on QuestionTextMetadata {
            questionText
          }
          ... on TextMetadata {
            text
          }
          ... on ImageMetadata {
            filePath
            url
          }
          ... on MultipleChoiceMetadata {
            options
            answerIndex
          }
          ... on MultiSelectMetadata {
            options
            answerIndices
          }
          ... on ShortAnswerMetadata {
            answer
          }
          ... on FractionMetadata {
            wholeNumber
            numerator
            denominator
          }
        }
      }
      grade
      assessmentType
      curriculumCountry
      curriculumRegion
      status
      updatedAt
    }
  }
`;

export const UPDATE_TEST = gql`
  mutation UpdateTest($id: ID!, $test: TestRequestDTO!) {
    updateTest(id: $id, test: $test) {
      id
      name
      questions {
        type
        metadata {
          ... on QuestionTextMetadata {
            questionText
          }
          ... on TextMetadata {
            text
          }
          ... on ImageMetadata {
            filePath
            url
          }
          ... on MultipleChoiceMetadata {
            options
            answerIndex
          }
          ... on MultiSelectMetadata {
            options
            answerIndices
          }
          ... on ShortAnswerMetadata {
            answer
          }
          ... on FractionMetadata {
            wholeNumber
            numerator
            denominator
          }
        }
      }
      grade
      assessmentType
      curriculumCountry
      curriculumRegion
      status
      updatedAt
    }
  }
`;
