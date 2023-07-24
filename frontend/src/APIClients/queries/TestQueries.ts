import { gql } from "@apollo/client";

export const GET_TEST = gql`
  query GetTest($id: ID!) {
    test(id: $id) {
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

export const GET_ALL_TESTS = gql`
  query GetAllTests {
    tests {
      id
      name
      grade
      assessmentType
      curriculumCountry
      curriculumRegion
      status
      updatedAt
    }
  }
`;

export const GET_PUBLISHED_TESTS = gql`
  query GetPublishedTests {
    publishedTests {
      id
      name
      grade
      assessmentType
      curriculumCountry
      curriculumRegion
    }
  }
`;
