import React from "react";
import {
  Text,
  Box,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { AdminUser } from "../../types/UserTypes";
import AddAdminModal from "../user-management/AddAdminModal";
import { AlertIcon } from "../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../APIClients/queries/UserQueries";
import AdminUsers from "../user-management/AdminUsers";
import AdminDashboard from "../common/admin/AdminDashboard";

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <AlertIcon />
    <Text textStyle="paragraph" color="blue.300">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);

const getAdminUser = (user: AdminUser) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const AdminPage = (): React.ReactElement => {
  const unselectedColor = useColorModeValue("#727278", "#727278");

  const { loading, error, data: adminData } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const admins = React.useMemo(() => {
    const filteredUsers = adminData?.usersByRole;
    return filteredUsers?.map(getAdminUser);
  }, [adminData]);

  const page = (
    <>
      <Box>
        <HStack justifyContent="space-between">
          <Text
            textStyle="header4"
            color="blue.300"
            style={{ textAlign: "left" }}
            marginBottom="0.5em"
          >
            Database
          </Text>
          <AddAdminModal />
        </HStack>
      </Box>
      {loading && (
        <Center margin="15%" flex="1">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Center margin="15%" flex="1">
          <ErrorState />
        </Center>
      )}
      {adminData && !error && !loading && (
        <Box flex="1">
          <Tabs marginTop={3}>
            <TabList>
              <Tab color={unselectedColor}>Admin</Tab>
              <Tab color={unselectedColor}>Teachers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminUsers admins={admins} />
              </TabPanel>
              <TabPanel>
                <p>hi</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );

  return <AdminDashboard page={page} />;
};

export default AdminPage;
