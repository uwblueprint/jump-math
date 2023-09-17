import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGOUT } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";
import ActionButton from "../common/form/ActionButton";

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
    <ActionButton
      onClick={onLogOutClick}
      showDefaultToasts={false}
      size="logout"
      variant="logout"
    >
      Logout
    </ActionButton>
  );
};

export default Logout;
