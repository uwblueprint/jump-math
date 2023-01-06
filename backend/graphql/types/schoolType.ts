import { gql } from "apollo-server-express";

const schoolType = gql`
  type SchoolResponseDTO {
    id: String!
    name: String!
    country: String!
    subRegion: String!
    city: String!
    address: String!
    teachers: [UserDTO!]!
  }

  extend type Query {
    school(id: ID!): SchoolResponseDTO!
    schools: [SchoolResponseDTO!]
  }
`;

export default schoolType;
