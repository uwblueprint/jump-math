import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import http from "http";
import * as firebaseAdmin from "firebase-admin";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { mongo } from "./models";
import buildSchema from "./graphql";
import { graphqlUploadExpress } from "./lib/graphqlUpload.cjs";

export type ExpressContext = {
  req: express.Request;
  res: express.Response;
};

const CORS_ALLOW_LIST = [
  // Local
  "http://localhost:3000",
  // Staging
  /^https:\/\/jump-math-staging--pr.*\.web\.app$/,
  "https://jump-math-staging.web.app",
  "https://jump-math-staging.firebaseapp.com",
  // Production
  "https://jumpmath.web.app",
  "https://jumpmath.firebaseapp.com",
];

const CORS_OPTIONS: cors.CorsOptions = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const runServer = async () => {
  await mongo.connect();

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_SVC_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      ),
      clientEmail: process.env.FIREBASE_SVC_ACCOUNT_CLIENT_EMAIL,
    }),
  });

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<ExpressContext>({
    schema: await buildSchema(),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  app.use(cookieParser());
  app.use(cors(CORS_OPTIONS));
  app.use(
    await graphqlUploadExpress({
      maxFileSize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 20,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/graphql",
    cors(CORS_OPTIONS),
    json(),
    expressMiddleware(server, {
      context: ({ req, res }) => Promise.resolve({ req, res }),
    }),
  );

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: process.env.PORT || 5000 }, resolve);
  });

  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
};

runServer().catch((err) => {
  /* eslint-disable-next-line no-console */
  console.error(err);
});
