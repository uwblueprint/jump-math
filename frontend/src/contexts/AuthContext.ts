import { createContext } from "react";

import { AuthenticatedStudent, AuthenticatedUser } from "../types/AuthTypes";

type AuthContextType = {
  authenticatedUser: AuthenticatedUser;
  setAuthenticatedUser: (_authenticatedUser: AuthenticatedUser) => void;
  authenticatedStudent: AuthenticatedStudent;
  setAuthenticatedStudent: (
    _authenticatedStudent: AuthenticatedStudent,
  ) => void;
};

const AuthContext = createContext<AuthContextType>({
  authenticatedUser: null,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setAuthenticatedUser: (_authenticatedUser: AuthenticatedUser): void => {},
  authenticatedStudent: null,
  setAuthenticatedStudent: (
    _authenticatedStudent: AuthenticatedStudent,
  ): void => {},
});

export default AuthContext;
