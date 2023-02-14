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

import { AdminUser } from "../../../types/UserTypes";
import AdminUserTable from "../../user-management/AdminUserTable";
import AddAdminModal from "../../user-management/AddAdminModal";
import { AlertIcon } from "../../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../../APIClients/queries/UserQueries";
import SortMenu from "../../common/SortMenu";
import SearchBar from "../../common/SearchBar";

import LoadingState from "../../common/LoadingState";

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

const UsersPage = (): React.ReactElement => {
  const unselectedColor = "#727278";
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState("firstName");
  const [sortOrder, setSortOrder] = React.useState("ascending");

  const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const filteredAdmins = React.useMemo(() => {
    let filteredUsers = data?.usersByRole;
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user: AdminUser) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredUsers?.map(getAdminUser);
  }, [search, data]);

  const admins = React.useMemo(() => {
    let sortedUsers: AdminUser[] = filteredAdmins as AdminUser[];
    if (sortOrder === "descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof AdminUser].toLowerCase() <
        b[sortProperty as keyof AdminUser].toLowerCase()
          ? 1
          : -1,
      );
    } else if (sortOrder === "ascending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof AdminUser].toLowerCase() >
        b[sortProperty as keyof AdminUser].toLowerCase()
          ? 1
          : -1,
      );
    }
    return sortedUsers;
  }, [filteredAdmins, sortProperty, sortOrder]);

  return (
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
      {data && !error && !loading && (
        <Box flex="1">
          <Tabs marginTop={3}>
            <TabList>
              <Tab color={unselectedColor}>Admin</Tab>
              <Tab color={unselectedColor}>Teachers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack pt={4} spacing={6}>
                  <HStack width="100%">
                    <SearchBar onSearch={setSearch} />
                    <SortMenu
                      properties={["firstName", "email"]}
                      onSortProperty={setSortProperty}
                      onSortOrder={setSortOrder}
                    />
                  </HStack>
                  {search && (
                    <Text fontSize="16px" color="grey.300" width="100%">
                      Showing {admins.length} results for &quot;{search}&quot;
                    </Text>
                  )}
                  <AdminUserTable adminUsers={admins} />
                </VStack>
              </TabPanel>
              <TabPanel>
                <AdminUserTable adminUsers={admins} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default UsersPage;
