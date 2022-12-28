import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGOUT } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";

const Logout = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [logout] = useMutation<{ logout: null }>(LOGOUT);

  const onLogOutClick = async () => {
    const success = await authAPIClient.logout(
      String(authenticatedUser?.id),
      logout,
    );
    if (success) {
      setAuthenticatedUser(null);
    }
  };

  return (
    <button type="button" className="btn btn-primary" onClick={onLogOutClick}>
      Log Out
    </button>
  );
};

export default Logout;
