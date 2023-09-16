import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGOUT } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";

const Logout = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [logout, { loading }] = useMutation<{ logout: null }>(LOGOUT);

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
    <Button
      isLoading={loading}
      onClick={onLogOutClick}
      size="logout"
      variant="logout"
    >
      Logout
    </Button>
  );
};

export default Logout;
