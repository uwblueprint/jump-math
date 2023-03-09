import { gql } from "@apollo/client";

const DUPLICATE_TEST = gql`
  mutation DuplicateTest($id: ID!) {
    duplicateTest(id: $id) {
      id
    }
  }
`;

export default DUPLICATE_TEST;
