import IdTokenVerifier from "idtoken-verifier";

import { DecodedJWT } from "../types/AuthTypes";

// No need to fill in the issuer and audience fields since we're not validating
// the token, just decoding it.
const idTokenVerifier = new IdTokenVerifier({
  issuer: "",
  audience: "",
});

export const decodeJWT = (token: string | null): DecodedJWT | null => {
  if (!token) {
    return null;
  }
  try {
    return idTokenVerifier.decode(token);
  } catch (e) {
    return null;
  }
};

export const shouldRenewToken = (token: string | null) => {
  const decodedToken = decodeJWT(token);
  if (decodedToken?.payload?.exp == null) return false;
  return decodedToken.payload.exp <= Math.round(new Date().getTime() / 1000);
};
