import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { REFRESH } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";

const RefreshCredentials = (): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);

  const [refresh] = useMutation<{ refresh: string }>(REFRESH);

  const onRefreshClick = async () => {
    const success = await authAPIClient.refresh(refresh);
    if (!success) {
      setAuthenticatedUser(null);
    }
  };

  return (
    <button className="btn btn-primary" onClick={onRefreshClick} type="button">
      Refresh Credentials
    </button>
  );
};

export default RefreshCredentials;
