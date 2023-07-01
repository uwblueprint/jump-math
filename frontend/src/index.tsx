import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import AuthAPIClient from "./APIClients/AuthAPIClient";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import type { AuthenticatedUser } from "./types/AuthTypes";
import * as auth from "./utils/AuthUtils";
import * as requestUtils from "./utils/HTTPRequestUtils";
import { getLocalStorageObjProperty } from "./utils/LocalStorageUtils";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const REFRESH_MUTATION = `
  mutation Index_Refresh {
    refresh
  }
`;

const LOGOUT_MUTATION = `
  mutation Index_Logout($userId: ID!) {
    logout(userId: $userId)
  }
`;

const link = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const attemptRefresh = async (): Promise<boolean | void> =>
  requestUtils.runUntilFirstSuccess(
    [
      // First, try to refresh the access token using the refresh token.
      // This can fail if the refresh token has expired, in which case we
      // need to log the user out.
      () =>
        AuthAPIClient.refresh(
          requestUtils.makeImperativeMutation(REFRESH_MUTATION),
          { raiseError: true },
        ),
      // Otherwise, try to log the user out. This can fail if the user is
      // already logged out, in which case we need to clear the local storage
      // and throw an error.
      () =>
        AuthAPIClient.logout(
          getLocalStorageObjProperty(AUTHENTICATED_USER_KEY, "userId") ?? "",
          requestUtils.makeImperativeMutation(LOGOUT_MUTATION),
          { raiseError: true },
        ),
      // As a last resort, just clear the local storage, reload the page, and
      // throw an error.
      () => {
        localStorage.removeItem(AUTHENTICATED_USER_KEY);
        location.reload();
        throw new Error("Failed to refresh token");
      },
    ],
    {
      failMessage: "All attempts to refresh token failed",
      failOnNetworkError: true,
    },
  );

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string | null = getLocalStorageObjProperty<
    NonNullable<AuthenticatedUser>,
    string
  >(AUTHENTICATED_USER_KEY, "accessToken");

  if (auth.shouldRefreshToken(token)) {
    // Attempt to refresh the token. This will throw an error if the refresh
    // fails, aborting the request.
    await attemptRefresh();

    token = getLocalStorageObjProperty<NonNullable<AuthenticatedUser>, string>(
      AUTHENTICATED_USER_KEY,
      "accessToken",
    );
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}`,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  link: authLink.concat(link as any),
  cache: new InMemoryCache(),
});

const domRoot = document.getElementById("root");
if (!domRoot) {
  throw new Error("Root element not found");
}
createRoot(domRoot).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
