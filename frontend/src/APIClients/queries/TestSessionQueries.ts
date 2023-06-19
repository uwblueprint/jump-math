import { gql } from "@apollo/client";

export const GET_TEST_SESSION_WITH_RESULTS = gql`
  query TestSessionWithResults($id: ID!) {
    testSession(id: $id) {
      id
      test {
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
        result {
          score
          answers
          breakdown
        }
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

export const GET_TEST_SESSION_TITLE = gql`
  query TestSessionTitle($id: ID!) {
    testSession(id: $id) {
      test {
        name
      }
    }
  }
`;
