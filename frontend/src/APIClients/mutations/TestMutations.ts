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

export const DELETE_TEST = gql`
  mutation DeleteTestById($id: ID!) {
    deleteTestById(id: $id)
  }
`;

export const UNARCHIVE_TEST = gql`
  mutation UnarchiveTest($id: ID!) {
    unarchiveTest(id: $id) {
      id
    }
  }
`;

export const SAVE_TEST = gql`
  mutation Create_Test($test: TestRequestDTO!) {
    createTest(test: $test) {
      id
    }
  }
`;

export const UPLOAD_TEST_IMAGE = gql`
  mutation UploadTestImage($file: Upload) {
    uploadTestImage(file: $file) {
      image
      path
    }
  }
`;
