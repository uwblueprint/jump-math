import React from "react";
import { useQuery } from "@apollo/client";
import { Spinner, Text, VStack, Image, Box } from "@chakra-ui/react";
import AdminUserTable from "../common/AdminUserTable";
import { AdminUser } from "../../types/UserTypes";

import WarningIcon from "../../assets/warning-icon.png";
import GET_USERS_BY_ROLE from "../../APIClients/queries/GetUsersByRole";

const AdminTablePage = (): React.ReactElement => {
  const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  if (loading)
    return (
      <>
        <VStack spacing={6}>
          <Spinner
            color="blue.300"
            size="xl"
            thickness="4px"
            emptyColor="gray.200"
            speed="0.65s"
          />
          <Text textStyle="paragraph">
            Please wait for the data to load. It will load momentarily.
          </Text>
        </VStack>
      </>
    );

  if (error)
    return (
      <>
        <VStack spacing={6}>
          <Image src={WarningIcon} />
          <Text textStyle="paragraph">
            The data has not loaded properly. Please reload the page or contact
            Jump Math.
          </Text>
        </VStack>
      </>
    );

  return (
    <Box>
      <AdminUserTable
        adminUsers={data?.usersByRole?.map((user: AdminUser) => {
          return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        })}
      />
    </Box>
  );
};

export default AdminTablePage;
