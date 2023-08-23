import gql from "graphql-tag";

const commonType = gql`
  scalar Date
  scalar FileUpload

  enum SortDirection {
    ASC
    DESC
  }
`;

export default commonType;
