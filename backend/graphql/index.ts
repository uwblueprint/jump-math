import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByRole,
  isAuthorizedByUserId,
  isAuthorizedForEveryone,
} from "../middlewares/auth";
import authResolvers from "./resolvers/authResolvers";
import authType from "./types/authType";
import schoolResolvers from "./resolvers/schoolResolvers";
import schoolType from "./types/schoolType";
import userResolvers from "./resolvers/userResolvers";
import userType from "./types/userType";
import testResolvers from "./resolvers/testResolvers";
import testType from "./types/testType";
import testSessionResolvers from "./resolvers/testSessionResolvers";
import testSessionType from "./types/testSessionType";
import classResolvers from "./resolvers/classResolvers";
import classType from "./types/classType";
import scalarType from "./types/scalarType";
import scalarResolvers from "./resolvers/scalarResolvers";

const buildSchema = async () => {
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
      scalarType,
      authType,
      schoolType,
      userType,
      testType,
      testSessionType,
      classType,
    ],
    resolvers: merge(
      await scalarResolvers(),
      authResolvers,
      schoolResolvers,
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
      userVerificationStatus: isAuthorizedForEveryone(),
      tests: authorizedByAllRoles(),
      schoolByTeacherId: isAuthorizedByUserId("teacherId"),
    },
    Mutation: {
      createUser: authorizedByAdmin(),
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
      createTestSession: authorizedByAllRoles(),
    },
  };

  return applyMiddleware(executableSchema, graphQLMiddlewares);
};

export default buildSchema;
