import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
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
    }
  }
`;
