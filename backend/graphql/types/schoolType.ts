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

  extend type Mutation {
    createSchool(school: SchoolRequestDTO!): SchoolResponseDTO!
    addTeacherToSchool(
      school: SchoolRequestDTO!
      schoolId: String!
      teacherId: String!
    ): SchoolResponseDTO!
  }
`;

export default schoolType;
