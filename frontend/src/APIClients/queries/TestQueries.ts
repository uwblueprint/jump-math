import { gql } from "@apollo/client";

const GET_ALL_TESTS = gql`
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

export default GET_ALL_TESTS;
