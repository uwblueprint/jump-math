import { gql } from "@apollo/client";

export const GET_TEST_SESSION = gql`
  query GetTestSession($id: ID!) {
    testSession(id: $id) {
      id
      test {
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
          }
        }
      }
      results {
        student {
          id
          firstName
          lastName
          studentNumber
        }
        score
        answers
        breakdown
      }
    }
  }
`;

export const GET_TEST_SESSION_BY_ACCESS_CODE = gql`
  query TestSessionByAccessCode($accessCode: String!) {
    testSessionByAccessCode(accessCode: $accessCode) {
      id
      test {
        id
      }
      notes
      startDate
    }
  }
`;

export const GET_TEST_SESSIONS_BY_TEACHER_ID = gql`
  query TestSessionsByTeacherId($teacherId: ID!) {
    testSessionsByTeacherId(teacherId: $teacherId) {
      id
      test {
        name
      }
      class {
        className
      }
      startDate
      endDate
      accessCode
    }
  }
`;
