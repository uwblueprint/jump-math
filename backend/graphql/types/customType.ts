import { gql } from "apollo-server-express";

const customType = gql`
  scalar Date
  scalar FileUpload
`;

export default customType;
