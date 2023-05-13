import { gql } from "apollo-server-express";

const commonType = gql`
  scalar Date
  scalar FileUpload
`;

export default commonType;
