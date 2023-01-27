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
  Input,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { User } from "../../types/UserTypes";
import Navbar from "../common/Navbar";
import Page from "../../types/PageTypes";
import AdminUserTable from "../user-management/AdminUserTable";
import TeacherUserTable from "../user-management/TeacherUserTable";
import AddAdminModal from "../user-management/AddAdminModal";
import { AlertIcon, SearchOutlineIcon } from "../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../APIClients/queries/UserQueries";
import SortTablePopover from "../common/SortTablePopover";

import * as Routes from "../../constants/Routes";
import LoadingState from "../common/LoadingState";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS },
  { title: "Database", url: Routes.USER_DATABASE },
];

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <AlertIcon />
    <Text textStyle="paragraph" color="blue.300">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);

const getUser = (user: User) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

type AdminUserProperty = "firstName" | "email";
type SortOrder = "Ascending" | "Descending";

const AdminPage = (): React.ReactElement => {
  const unselectedColor = useColorModeValue("#727278", "#727278");
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState<AdminUserProperty>(
    "firstName",
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("Ascending");

  const OrderingSets = {
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
  };

  const {
    loading: adminLoading,
    error: adminError,
    data: adminData,
  } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const {
    loading: teacherLoading,
    error: teacherError,
    data: teacherData,
  } = useQuery(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Teacher" },
  });

  const filterUsers = (users: any) => {
    let filteredUsers = users;
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user: User) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredUsers?.map(getUser);
  };

  const sortUsers = (users: User[]) => {
    let sortedUsers: User[] = users;
    if (sortOrder === "Descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase() ? 1 : -1,
      );
    } else if (sortOrder === "Ascending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase() ? 1 : -1,
      );
    }
    return sortedUsers;
  };

  const filteredAdmins = React.useMemo(() => {
    return filterUsers(adminData?.usersByRole);
  }, [search, adminData]);

  const filteredTeachers = React.useMemo(() => {
    return filterUsers(teacherData?.usersByRole);
  }, [search, teacherData]);

  const admins = React.useMemo(() => {
    return sortUsers(filteredAdmins as User[]);
  }, [filteredAdmins, sortProperty, sortOrder]);

  const teachers = React.useMemo(() => {
    return sortUsers(filteredTeachers as User[]);
  }, [filteredTeachers, sortProperty, sortOrder]);

  const loading = adminLoading || teacherLoading;
  const error = adminError || teacherError;
  const data = adminData || teacherData;

  return (
    <VStack flex="1" align="left">
      <Navbar pages={pages} />
      <Box padding="1.5em 2em 0em 2em">
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
            <Tabs marginTop={3} onChange={() => setSearch("")}>
              <TabList>
                <Tab color={unselectedColor}>Admin</Tab>
                <Tab color={unselectedColor}>Teachers</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack pt={4} spacing={6}>
                    <HStack width="100%">
                      <InputGroup width="95%">
                        <Input
                          borderRadius="6px"
                          borderColor="grey.100"
                          backgroundColor="grey.100"
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          placeholder="Search bar"
                        />
                        <InputRightElement pointerEvents="none" h="full">
                          <SearchOutlineIcon />
                        </InputRightElement>
                      </InputGroup>
                      <SortTablePopover OrderingSets={OrderingSets} />
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
                  <VStack pt={4} spacing={6}>
                    <HStack width="100%">
                      <InputGroup width="95%">
                        <Input
                          borderRadius="6px"
                          borderColor="grey.100"
                          backgroundColor="grey.100"
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          placeholder="Search bar"
                        />
                        <InputRightElement pointerEvents="none" h="full">
                          <SearchOutlineIcon />
                        </InputRightElement>
                      </InputGroup>
                      <SortTablePopover OrderingSets={OrderingSets} />
                    </HStack>
                    {search && (
                      <Text fontSize="16px" color="grey.300" width="100%">
                        Showing {teachers.length} results for &quot;{search}
                        &quot;
                      </Text>
                    )}
                    <TeacherUserTable teacherUsers={teachers} />
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default AdminPage;
