import { gql } from "@apollo/client";

const PUBLISH_TEST_MUTATION = gql`
  mutation PublishTestMutation($testId: String!) {
    publishTest(testId: $testId) {
        id
        name
        admin
        questions
        grade
        assessmentType
        status
        curriculumCountry
        curriculumRegion
  }
`;

export default PUBLISH_TEST_MUTATION;
