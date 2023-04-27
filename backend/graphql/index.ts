import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import { isAuthorizedByRole, isAuthorizedByUserId } from "../middlewares/auth";
import authResolvers from "./resolvers/authResolvers";
import authType from "./types/authType";
import entityResolvers from "./resolvers/entityResolvers";
import entityType from "./types/entityType";
import schoolResolvers from "./resolvers/schoolResolvers";
import schoolType from "./types/schoolType";
import simpleEntityResolvers from "./resolvers/simpleEntityResolvers";
import simpleEntityType from "./types/simpleEntityType";
import userResolvers from "./resolvers/userResolvers";
import userType from "./types/userType";
import testResolvers from "./resolvers/testResolvers";
import testType from "./types/testType";
import testSessionResolvers from "./resolvers/testSessionResolvers";
import testSessionType from "./types/testSessionType";
import classResolvers from "./resolvers/classResolvers";
import classType from "./types/classType";

const query = gql`
  type Query {
    _empty: String
  }
`;

const mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    authType,
    entityType,
    schoolType,
    simpleEntityType,
    userType,
    testType,
    testSessionType,
    classType,
  ],
  resolvers: merge(
    authResolvers,
    entityResolvers,
    schoolResolvers,
    simpleEntityResolvers,
    userResolvers,
    testResolvers,
    testSessionResolvers,
    classResolvers,
  ),
});

const authorizedByAllRoles = () =>
  isAuthorizedByRole(new Set(["Teacher", "Admin"]));
const authorizedByAdmin = () => isAuthorizedByRole(new Set(["Admin"]));

const graphQLMiddlewares = {
  Query: {
    entity: authorizedByAllRoles(),
    entities: authorizedByAllRoles(),
    simpleEntity: authorizedByAllRoles(),
    simpleEntities: authorizedByAllRoles(),
    userById: authorizedByAdmin(),
    users: authorizedByAdmin(),
    tests: authorizedByAllRoles(),
  },
  Mutation: {
    createEntity: authorizedByAllRoles(),
    updateEntity: authorizedByAllRoles(),
    deleteEntity: authorizedByAllRoles(),
    createSimpleEntity: authorizedByAllRoles(),
    updateSimpleEntity: authorizedByAllRoles(),
    deleteSimpleEntity: authorizedByAllRoles(),
    createUser: authorizedByAdmin(),
    updateUser: authorizedByAdmin(),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    createTest: authorizedByAdmin(),
    updateTest: authorizedByAdmin(),
    deleteTest: authorizedByAdmin(),
    publishTest: authorizedByAdmin(),
    duplicateTest: authorizedByAdmin(),
    unarchiveTest: authorizedByAdmin(),
    archiveTest: authorizedByAdmin(),
    createClass: authorizedByAllRoles(),
    createStudent: authorizedByAllRoles(),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
