import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Box, Flex, Text } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGOUT } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";
import { activePage } from "../common/NavbarItem";

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
    <Box>
      <Flex
        _hover={activePage}
        align="center"
        cursor="pointer"
        mx="4"
        onClick={onLogOutClick}
      >
        <Text fontSize="14px">Logout</Text>
      </Flex>
    </Box>
  );
};

export default Logout;
