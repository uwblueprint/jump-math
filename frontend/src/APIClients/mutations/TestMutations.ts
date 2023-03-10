import { gql } from "@apollo/client";

const PUBLISH_TEST = gql`
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

export default PUBLISH_TEST;
