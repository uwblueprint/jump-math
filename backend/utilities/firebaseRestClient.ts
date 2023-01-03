import fetch, { Response } from "node-fetch";

import { Token } from "../types";
import logger from "./logger";

const Logger = logger(__filename);

const FIREBASE_SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const FIREBASE_REFRESH_TOKEN_URL =
  "https://securetoken.googleapis.com/v1/token";
const FIREBASE_CONFIRM_EMAIL_VERIFICATION_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update";
const FIREBASE_RESET_PASSWORD_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword";

type PasswordSignInResponse = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
};

type RefreshTokenResponse = {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
};

type RequestError = {
  error: {
    code: number;
    message: string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    errors: any;
  };
};

type ConfirmEmailVerificationResponse = {
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: JSON[];
  emailVerified: boolean;
};

type ResetPasswordResponse = {
  email: string;
  requestType: string;
};

const FirebaseRestClient = {
  // Docs: https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
  signInWithPassword: async (
    email: string,
    password: string,
  ): Promise<Token> => {
    const response: Response = await fetch(
      `${FIREBASE_SIGN_IN_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    const responseJson:
      | PasswordSignInResponse
      | RequestError = await response.json();

    if (!response.ok) {
      const errorMessage = [
        "Failed to sign-in via Firebase REST API, status code =",
        `${response.status},`,
        "error message =",
        (responseJson as RequestError).error.message,
      ];
      Logger.error(errorMessage.join(" "));

      throw new Error("Failed to sign-in via Firebase REST API");
    }

    return {
      accessToken: (responseJson as PasswordSignInResponse).idToken,
      refreshToken: (responseJson as PasswordSignInResponse).refreshToken,
    };
  },

  // Docs: https://firebase.google.com/docs/reference/rest/auth/#section-refresh-token
  refreshToken: async (refreshToken: string): Promise<Token> => {
    const response: Response = await fetch(
      `${FIREBASE_REFRESH_TOKEN_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      },
    );

    const responseJson:
      | RefreshTokenResponse
      | RequestError = await response.json();

    if (!response.ok) {
      const errorMessage = [
        "Failed to refresh token via Firebase REST API, status code =",
        `${response.status},`,
        "error message =",
        (responseJson as RequestError).error.message,
      ];
      Logger.error(errorMessage.join(" "));

      throw new Error("Failed to refresh token via Firebase REST API");
    }

    return {
      accessToken: (responseJson as RefreshTokenResponse).id_token,
      refreshToken: (responseJson as RefreshTokenResponse).refresh_token,
    };
  },

  // Docs: https://firebase.google.com/docs/reference/rest/auth/#section-confirm-email-verification
  confirmEmailVerification: async (
    oobCode: string,
  ): Promise<ConfirmEmailVerificationResponse> => {
    const response: Response = await fetch(
      `${FIREBASE_CONFIRM_EMAIL_VERIFICATION_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oobCode,
        }),
      },
    );

    const responseJson:
      | ConfirmEmailVerificationResponse
      | RequestError = await response.json();

    if (!response.ok) {
      const errorMessage = [
        "Failed to confirm email verification, status =",
        `${response.status},`,
        "error message =",
        (responseJson as RequestError).error.message,
      ];
      Logger.error(errorMessage.join(" "));

      throw new Error(
        "Failed to confirm email verification via Firebase REST API",
      );
    }
    return responseJson as ConfirmEmailVerificationResponse;
  },

  // Docs: https://firebase.google.com/docs/reference/rest/auth/#section-verify-password-reset-code
  verifyPasswordResetCode: async (
    oobCode: string,
  ): Promise<ResetPasswordResponse> => {
    const response: Response = await fetch(
      `${FIREBASE_RESET_PASSWORD_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oobCode,
        }),
      },
    );

    const responseJson:
      | ResetPasswordResponse
      | RequestError = await response.json();

    if (!response.ok) {
      const errorMessage = [
        "Failed to verify password reset code, status =",
        `${response.status},`,
        "error message =",
        (responseJson as RequestError).error.message,
      ];
      Logger.error(errorMessage.join(" "));

      throw new Error(
        "Failed to verify password reset code via Firebase REST API",
      );
    }
    return responseJson as ResetPasswordResponse;
  },

  // Docs: https://firebase.google.com/docs/reference/rest/auth/#section-confirm-reset-password
  confirmPasswordReset: async (
    newPassword: string,
    oobCode: string,
  ): Promise<ResetPasswordResponse> => {
    const response: Response = await fetch(
      `${FIREBASE_RESET_PASSWORD_URL}?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oobCode,
          newPassword,
        }),
      },
    );

    const responseJson:
      | ResetPasswordResponse
      | RequestError = await response.json();

    if (!response.ok) {
      const errorMessage = [
        "Failed to apply a password reset change, status =",
        `${response.status},`,
        "error message =",
        (responseJson as RequestError).error.message,
      ];
      Logger.error(errorMessage.join(" "));

      throw new Error(
        "Failed to apply a password reset change via Firebase REST API",
      );
    }
    return responseJson as ResetPasswordResponse;
  },
};

export default FirebaseRestClient;
