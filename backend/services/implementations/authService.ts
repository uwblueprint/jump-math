import * as firebaseAdmin from "firebase-admin";

import IAuthService from "../interfaces/authService";
import IEmailService from "../interfaces/emailService";
import IUserService from "../interfaces/userService";
import { AuthDTO, Role, Token } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import FirebaseRestClient from "../../utilities/firebaseRestClient";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class AuthService implements IAuthService {
  userService: IUserService;

  emailService: IEmailService | null;

  constructor(
    userService: IUserService,
    emailService: IEmailService | null = null,
  ) {
    this.userService = userService;
    this.emailService = emailService;
  }

  /* eslint-disable class-methods-use-this */
  async generateToken(email: string, password: string): Promise<AuthDTO> {
    try {
      const token = await FirebaseRestClient.signInWithPassword(
        email,
        password,
      );
      const user = await this.userService.getUserByEmail(email);
      return { ...token, ...user };
    } catch (error) {
      Logger.error(`Failed to generate token for user with email ${email}`);
      throw error;
    }
  }

  /* eslint-disable class-methods-use-this */
  async generateTokenOAuth(idToken: string): Promise<AuthDTO> {
    try {
      const googleUser = await FirebaseRestClient.signInWithGoogleOAuth(
        idToken,
      );
      // googleUser.idToken refers to the Firebase Auth access token for the user
      const token = {
        accessToken: googleUser.idToken,
        refreshToken: googleUser.refreshToken,
      };
      // If user already has a login with this email, just return the token
      try {
        // Note: an error message will be logged from UserService if this lookup fails.
        // You may want to silence the logger for this special OAuth user lookup case
        const user = await this.userService.getUserByEmail(googleUser.email);
        return { ...token, ...user };
        /* eslint-disable-next-line no-empty */
      } catch (error) {}

      const user = await this.userService.createUser(
        {
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          email: googleUser.email,
          role: "Teacher",
          password: "",
        },
        googleUser.localId,
        "GOOGLE",
      );

      return { ...token, ...user };
    } catch (error) {
      Logger.error(`Failed to generate token for user with OAuth ID token`);
      throw error;
    }
  }

  async revokeTokens(userId: string): Promise<void> {
    try {
      const authId = await this.userService.getAuthIdById(userId);

      await firebaseAdmin.auth().revokeRefreshTokens(authId);
    } catch (error: unknown) {
      const errorMessage = [
        "Failed to revoke refresh tokens of user with id",
        `${userId}.`,
        "Reason =",
        getErrorMessage(error),
      ];
      Logger.error(errorMessage.join(" "));

      throw error;
    }
  }

  async renewToken(refreshToken: string): Promise<Token> {
    try {
      return await FirebaseRestClient.refreshToken(refreshToken);
    } catch (error) {
      Logger.error("Failed to refresh token");
      throw error;
    }
  }

  private getEmailTemplate(
    imageHeaderPath: string,
    firstName: string,
    paragraphs: string[],
    link: string,
    buttonText: string,
  ): string {
    return `
    <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'>
    <img src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump-math-logo.png"
         style = "display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 222px;
                  height: 64px;">
    <img src="https://storage.googleapis.com/jump-math-98edf.appspot.com/${imageHeaderPath}"
         style = "display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 100%;
                  height: auto;
                  max-width: 520px;
                  max-height: 300px;">
    <span style="color:#4B7BEC;
                font-family: 'DM Sans';
                font-weight: bold;
                font-size: 18px;
                line-height: 23px;">
    <br><br>
    Hey ${firstName},
    </span>
    <br><br>
    <span style="font-size: 24px;
                font-family: 'DM Sans';
                color: #154472;">
      ${paragraphs[0]}
    </span>
    <br><br>
    <span style="font-family: 'DM Sans';
                font-weight: 400;
                font-size: 18px;
                color: #154472;">
      ${paragraphs[1]}
      <br><br>
      ${paragraphs[2]}
      <br><br>
      <center>
      <a href="${link}" target="_blank" style="font-size: 16px; font-family: 'DM Sans'; color: #ffffff; font-weight: 700; text-align:center; background-color: #154472; text-decoration: none; border: none; -webkit-border-radius: 16px; -moz-border-radius: 16px; border-radius: 16px; display: inline-block; -webkit-text-decoration: none; -moz-text-decoration: none; text-decoration: none;">
        <span style="font-size: 16px; font-family: 'DM Sans'; color: #ffffff; font-weight: 700; line-height:3em; text-align:center; padding: 20px;">${buttonText}</span>
      </a>
      </center>
      <br>
      Have questions about Jump Math? Drop us an email at <span style="text-decoration: underline;">askus@jumpmath.ca</span> and we’ll get in touch shortly!
      <br><br>
      <strong style="letter-spacing: 0.16em;">AUTOMATION PRIVACY POLICY:</strong>
      <br><br>
      Please do not share this email to anyone as it contains confidential information!
    </span>`;
  }

  async resetPassword(email: string): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call resetPassword but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const user = await this.userService.getUserByEmail(email);
      const resetLink = await firebaseAdmin
        .auth()
        .generatePasswordResetLink(email);

      const emailBody = this.getEmailTemplate(
        "password-reset-header.png",
        user.firstName,
        [
          "You’re receiving this email because you requested to reset your password.",
          "Please use the link below to reset your log in details and you can hop back into helping your class excel in mathematics!",
          "If you did not request this change, please disregard this message or contact HR if you are facing doubt.",
        ],
        resetLink,
        "Reset Password",
      );

      this.emailService.sendEmail(email, "Your Password Reset Link", emailBody);
    } catch (error) {
      Logger.error(
        `Failed to generate password reset link for user with email ${email}`,
      );
      throw error;
    }
  }

  async sendEmailVerificationLink(email: string): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call sendEmailVerificationLink but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const user = await this.userService.getUserByEmail(email);
      const emailVerificationLink = await firebaseAdmin
        .auth()
        .generateEmailVerificationLink(email);
      const emailBody = this.getEmailTemplate(
        "email-header.png",
        user.firstName,
        [
          "You have been invited to join the Jump Math Workspace!",
          "Please use the link below to confirm your log in details and you can receive your personalized Jump Math email address if you haven’t already!",
          "We can’t wait for you to join a team of likeminded individuals and help us take a step forward in the education of over 250,000 students globally!",
        ],
        emailVerificationLink,
        "Open Jump Math",
      );
      this.emailService.sendEmail(email, "Verify your email", emailBody);
    } catch (error) {
      Logger.error(
        `Failed to generate email verification link for user with email ${email}`,
      );
      throw error;
    }
  }

  async isAuthorizedByRole(
    accessToken: string,
    roles: Set<Role>,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken = await firebaseAdmin
        .auth()
        .verifyIdToken(accessToken, true);
      const userRole = await this.userService.getUserRoleByAuthId(
        decodedIdToken.uid,
      );

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return firebaseUser.emailVerified && roles.has(userRole);
    } catch (error) {
      return false;
    }
  }

  async isAuthorizedByUserId(
    accessToken: string,
    requestedUserId: string,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken = await firebaseAdmin
        .auth()
        .verifyIdToken(accessToken, true);
      const tokenUserId = await this.userService.getUserIdByAuthId(
        decodedIdToken.uid,
      );

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return (
        firebaseUser.emailVerified && String(tokenUserId) === requestedUserId
      );
    } catch (error) {
      return false;
    }
  }

  async isAuthorizedByEmail(
    accessToken: string,
    requestedEmail: string,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken = await firebaseAdmin
        .auth()
        .verifyIdToken(accessToken, true);

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return (
        firebaseUser.emailVerified && decodedIdToken.email === requestedEmail
      );
    } catch (error) {
      return false;
    }
  }
}

export default AuthService;
