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
import AdminTab from "../../user-management/AdminTab";
import { User } from "../../../types/UserTypes";
import AdminUserTable from "../../user-management/AdminUserTable";
import AddAdminModal from "../../user-management/AddAdminModal";
import { AlertIcon } from "../../../assets/icons";
<<<<<<< HEAD
import {
  GET_USERS_BY_ROLE,
  GET_ALL_TEACHERS,
} from "../../../APIClients/queries/UserQueries";
import TeacherUserTable from "../../user-management/TeacherUserTable";
=======
import { GET_USERS_BY_ROLE } from "../../../APIClients/queries/UserQueries";
import SortMenu from "../../common/SortMenu";
import SearchBar from "../../common/SearchBar";
>>>>>>> staging

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

const getUser = (user: User) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    school: user.school ? user.school : null,
  };
};

type UserProperty = "firstName" | "email" | "school";
type SortOrder = "ascending" | "descending";

const UsersPage = (): React.ReactElement => {
  const unselectedColor = useColorModeValue("#727278", "#727278");
  const [search, setSearch] = React.useState("");
  const [sortProperty, setSortProperty] = React.useState<UserProperty>(
    "firstName",
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ascending");

  const OrderingSets = {
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
  };

  const SearchingSets = {
    search,
    setSearch,
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
  } = useQuery(GET_ALL_TEACHERS, {
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
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.school?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredUsers?.map(getUser);
  };

  const sortUsers = (users: User[]) => {
    let sortedUsers: User[] = users;
    // Check to make sure we're not sorting admin users by school
    if (users && !users[0][sortProperty]) {
      return users;
    }
    if (sortOrder === "descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty]!.toLowerCase() < b[sortProperty]!.toLowerCase()
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
  };

  const filteredAdmins = React.useMemo(() => {
    return filterUsers(adminData?.usersByRole);
  }, [search, adminData]);

  const filteredTeachers = React.useMemo(() => {
    return filterUsers(teacherData?.teachers);
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

  const clearSearchAndSort = () => {
    setSearch("");
    setSortProperty("firstName");
    setSortOrder("ascending");
  };

  type Role = "teacher" | "admin";
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
          <Tabs marginTop={3} onChange={clearSearchAndSort}>
            <TabList>
              <Tab color={unselectedColor}>Admin</Tab>
              <Tab color={unselectedColor}>Teachers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminTab
                  OrderingSets={OrderingSets}
                  SearchingSets={SearchingSets}
                  UserTable={<AdminUserTable users={admins} />}
                  searchLength={admins.length}
                  role={"admin" as Role}
                />
              </TabPanel>
              <TabPanel>
                <AdminTab
                  OrderingSets={OrderingSets}
                  SearchingSets={SearchingSets}
                  UserTable={<TeacherUserTable users={teachers} />}
                  searchLength={teachers.length}
                  role={"teacher" as Role}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default UsersPage;
