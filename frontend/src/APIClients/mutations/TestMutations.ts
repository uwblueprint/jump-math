import { gql } from "@apollo/client";

export const DUPLICATE_TEST = gql`
  mutation DuplicateTest($id: ID!) {
    duplicateTest(id: $id) {
      id
    }
  }
`;

export const DELETE_TEST = gql`
  mutation DeleteTestById($id: ID!) {
    deleteTestById(id: $id)
  }
`;
