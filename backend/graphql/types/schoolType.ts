import { gql } from "apollo-server-express";

const schoolType = gql`
  input SchoolRequestDTO {
    name: String!
    country: String!
    subRegion: String!
    city: String!
    address: String!
    teachers: [String!]!
  }

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

  extend type Mutation {
    createSchool(school: SchoolRequestDTO!): SchoolResponseDTO!
  }
`;

export default schoolType;
