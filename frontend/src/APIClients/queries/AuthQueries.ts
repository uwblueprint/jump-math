import { gql } from "@apollo/client";

export const VERIFY_PASSWORD_RESET_CODE = gql`
  query VerifyPasswordResetCode($oobCode: String!) {
    verifyPasswordResetCode(oobCode: $oobCode)
  }
`;
