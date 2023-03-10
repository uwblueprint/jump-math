import { gql } from "@apollo/client";

export const PUBLISH_TEST = gql`
  mutation PublishTest($id: ID!) {
    publishTest(id: $id) {
      id
      name
      questions {
        type
        metadata {
          ... on MultipleChoiceMetadata {
            options
            answerIndex
          }

          ... on QuestionTextMetadata {
            questionText
          }
          ... on TextMetadata {
            text
          }
          ... on ImageMetadata {
            src
          }
          ... on MultiSelectMetadata {
            options
            answerIndices
          }
          ... on ShortAnswerMetadata {
            answer
          }
        }
      }
      grade
      assessmentType
      status
      curriculumCountry
      curriculumRegion
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
