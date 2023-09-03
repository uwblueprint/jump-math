import gql from "graphql-tag";

const entityType = gql`
  enum Enum {
    A
    B
    C
    D
  }

  type EntityResponseDTO {
    id: ID!
    stringField: String!
    intField: Int!
    enumField: Enum!
    stringArrayField: [String]!
    boolField: Boolean!
    fileName: String
  }

  input EntityRequestDTO {
    stringField: String!
    intField: Int!
    enumField: Enum!
    stringArrayField: [String]!
    boolField: Boolean!
    filePath: String
    contentType: String
  }

  extend type Query {
    entity(id: ID!): EntityResponseDTO!
    entities: [EntityResponseDTO!]!
    entitiesCSV: String!
    file(fileUUID: ID!): String!
  }

  extend type Mutation {
    createEntity(
      entity: EntityRequestDTO!
      file: FileUpload
    ): EntityResponseDTO!
    updateEntity(
      id: ID!
      entity: EntityRequestDTO!
      file: FileUpload
    ): EntityResponseDTO!
    deleteEntity(id: ID!): ID
  }
`;

export default entityType;