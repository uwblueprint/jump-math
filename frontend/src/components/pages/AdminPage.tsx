import React from "react";
import {
  Flex,
  Text,
  Box,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
  Spinner,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { AdminUser } from "../../types/UserTypes";
import SideBar from "../common/Sidebar";
import Page from "../../types/PageTypes";
import AdminUserTable from "../common/AdminUserTable";
import AddAdminModal from "../common/AddAdminModal";
import { SettingsOutlineIcon, AlertIcon, SearchBar } from "../common/icons";
import GET_USERS_BY_ROLE from "../../APIClients/queries/GetUsersByRole";

const pages: Page[] = [
  { title: "Assessments", url: "/", icon: SettingsOutlineIcon },
  { title: "Database", url: "/", icon: SettingsOutlineIcon },
];

const LoadingState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <Spinner
      color="blue.300"
      size="xl"
      thickness="4px"
      emptyColor="gray.200"
      speed="0.65s"
    />
    <Text textStyle="paragraph" color="blue.300">
      Please wait for the data to load. It will load momentarily.
    </Text>
  </VStack>
);

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
  const [search, setSearch] = React.useState("");

  const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const adminData = React.useMemo(() => {
    const filteredUsers = data?.usersByRole;

    if (!search) return filteredUsers;
    return filteredUsers.filter(
      (user: AdminUser) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  return (
    <Flex margin={0}>
      <SideBar pages={pages} />
      <VStack flex="1" align="left" margin="4.5em 2em 0em 2em">
        <Box>
          <Text
            textStyle="header4"
            color="blue.300"
            style={{ textAlign: "left" }}
            marginBottom="0.5em"
          >
            Database
          </Text>
          <HStack justifyContent="space-between">
            <InputGroup maxWidth="280px">
              <Input
                borderRadius="6px"
                backgroundColor="grey.100"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bar"
              />
              <InputRightElement pointerEvents="none" h="full">
                <SearchBar />
              </InputRightElement>
            </InputGroup>
            <AddAdminModal />
          </HStack>
        </Box>
        <Center flex="1">
          {loading && <LoadingState />}
          {error && <ErrorState />}
          {data && !error && !loading && (
            <Tabs marginTop={3}>
              <TabList>
                <Tab color={unselectedColor}>Admin</Tab>
                <Tab color={unselectedColor}>Teachers</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AdminUserTable
                    adminUsers={adminData?.map((user: AdminUser) =>
                      getAdminUser(user),
                    )}
                  />
                </TabPanel>
                <TabPanel>
                  <AdminUserTable
                    adminUsers={adminData?.map((user: AdminUser) =>
                      getAdminUser(user),
                    )}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </Center>
      </VStack>
    </Flex>
  );
};

export default AdminPage;
