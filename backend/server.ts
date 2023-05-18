import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import * as firebaseAdmin from "firebase-admin";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { mongo } from "./models";
import schema from "./graphql";

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
  app.use(cookieParser());
  app.use(cors(CORS_OPTIONS));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const server = new ApolloServer<ExpressContext>({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });
  await server.start();

  app.use(
    "/graphql",
    cors(CORS_OPTIONS),
    json(),
    expressMiddleware(server, {
      context: ({ req, res }) => Promise.resolve({ req, res }),
    }),
  );

  await new Promise<void>((resolve) => {
    app.listen({ port: process.env.PORT || 5000 }, () => {
      /* eslint-disable-next-line no-console */
      console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
      resolve();
    });
  });
};

runServer().catch((err) => {
  /* eslint-disable-next-line no-console */
  console.error(err);
});
