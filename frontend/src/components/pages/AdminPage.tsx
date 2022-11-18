import React from "react";
import {
  Flex,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { AdminUser } from "../../types/UserTypes";
import SideBar from "../common/Sidebar";
import Page from "../../types/PageTypes";
import AdminUserTable from "../common/AdminUserTable";
import AddAdminModal from "../common/AddAdminModal";
import { SettingsOutlineIcon, AlertIcon } from "../common/icons";
import GET_USERS_BY_ROLE from "../../APIClients/queries/GetUsersByRole";

const pages: Page[] = [
  { title: "Assessments", url: "/", icon: SettingsOutlineIcon },
  { title: "Database", url: "/", icon: SettingsOutlineIcon },
];

const LoadingState = (): React.ReactElement => (
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
);

const getAdminUser = (user: AdminUser) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6}>
    <AlertIcon />
    <Text textStyle="paragraph">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);

const AdminPage = (): React.ReactElement => {
  const unselectedColor = useColorModeValue("#727278", "#727278");

  const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  if (loading)
    return (
      <>
        <LoadingState />
      </>
    );
  if (error)
    return (
      <>
        <ErrorState />
      </>
    );

  return (
    <Flex mx="4">
      <Box p={0} w="20%">
        <SideBar pages={pages} />
      </Box>
      <Flex direction="column" w="100%" pt={20}>
        <Text
          textStyle="header4"
          color="blue.300"
          style={{ textAlign: "left" }}
        >
          Database
        </Text>
        <Box textAlign="right" pr={10}>
          <AddAdminModal />
        </Box>
        <Tabs pr={5}>
          <TabList>
            <Tab color={unselectedColor}>Admin</Tab>
            <Tab color={unselectedColor}>Teachers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminUserTable
                adminUsers={data?.usersByRole?.map((user: AdminUser) =>
                  getAdminUser(user),
                )}
              />
            </TabPanel>
            <TabPanel>
              <AdminUserTable
                adminUsers={data?.usersByRole?.map((user: AdminUser) =>
                  getAdminUser(user),
                )}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AdminPage;
