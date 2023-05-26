import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";

import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import type { AuthenticatedUser } from "./types/AuthTypes";
import * as auth from "./utils/AuthUtils";
import {
  getLocalStorageObjProperty,
  setLocalStorageObjProperty,
} from "./utils/LocalStorageUtils";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const REFRESH_MUTATION = `
  mutation Index_Refresh {
    refresh
  }
`;

const link = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string | null = getLocalStorageObjProperty<
    NonNullable<AuthenticatedUser>,
    string
  >(AUTHENTICATED_USER_KEY, "accessToken");

  // refresh if token has expired
  if (auth.shouldRenewToken(token)) {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      { query: REFRESH_MUTATION },
      { withCredentials: true },
    );

    const accessToken: string = data.data.refresh;
    setLocalStorageObjProperty(
      AUTHENTICATED_USER_KEY,
      "accessToken",
      accessToken,
    );
    token = accessToken;
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
