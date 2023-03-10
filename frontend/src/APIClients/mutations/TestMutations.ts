import { gql } from "@apollo/client";

export const PUBLISH_TEST = gql`
  mutation PublishTest($id: ID!) {
    publishTest(id: $id) {
      id
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
