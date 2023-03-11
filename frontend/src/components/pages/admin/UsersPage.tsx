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
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import AdminTab from "../../user-management/AdminTab";
import { AdminUser, TeacherUser } from "../../../types/UserTypes";
import AdminUserTable from "../../user-management/AdminUserTable";
import AddAdminModal from "../../user-management/AddAdminModal";
import { AlertIcon } from "../../../assets/icons";
import {
  GET_USERS_BY_ROLE,
  GET_ALL_TEACHERS,
} from "../../../APIClients/queries/UserQueries";
import TeacherUserTable from "../../user-management/TeacherUserTable";
import SortMenu from "../../common/table/SortMenu";
import SearchBar from "../../common/table/SearchBar";

import LoadingState from "../../common/LoadingState";
import { TabEnum } from "../../../types/AuthTypes";

const ErrorState = (): React.ReactElement => (
  <VStack spacing={6} textAlign="center">
    <AlertIcon />
    <Text textStyle="paragraph" color="blue.300">
      The data has not loaded properly. Please reload the page or contact Jump
      Math.
    </Text>
  </VStack>
);
const getTeacherUser = (user: TeacherUser) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    school: user.school,
  };
};

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
  const [tabIndex, setTabIndex] = React.useState<TabEnum>(TabEnum.ADMIN);

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

  const filterTeacherUsers = (users: any) => {
    let filteredUsers = users;
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user: TeacherUser) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.school.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return filteredUsers?.map(getTeacherUser);
  };

  const filterAdminUsers = (users: any) => {
    let filteredUsers = users;
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
  };

  const sortTeacherUsers = (users: TeacherUser[]) => {
    let sortedUsers: TeacherUser[] = users;
    if (sortOrder === "descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof TeacherUser]!.toLowerCase() <
        b[sortProperty as keyof TeacherUser]!.toLowerCase()
          ? 1
          : -1,
      );
    } else if (sortOrder === "ascending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof TeacherUser]!.toLowerCase() >
        b[sortProperty as keyof TeacherUser]!.toLowerCase()
          ? 1
          : -1,
      );
    }
    return sortedUsers;
  };

  const sortAdminUsers = (users: AdminUser[]) => {
    let sortedUsers: AdminUser[] = users;
    if (sortOrder === "descending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof AdminUser]!.toLowerCase() <
        b[sortProperty as keyof AdminUser]!.toLowerCase()
          ? 1
          : -1,
      );
    } else if (sortOrder === "ascending") {
      sortedUsers = sortedUsers?.sort((a, b) =>
        a[sortProperty as keyof AdminUser]!.toLowerCase() >
        b[sortProperty as keyof AdminUser]!.toLowerCase()
          ? 1
          : -1,
      );
    }
    return sortedUsers;
  };

  const filteredAdmins = React.useMemo(() => {
    if (tabIndex === TabEnum.TEACHER) {
      return [];
    }
    return filterAdminUsers(adminData?.usersByRole);
  }, [search, adminData, tabIndex]);

  const filteredTeachers = React.useMemo(() => {
    if (tabIndex === TabEnum.ADMIN) {
      return [];
    }
    return filterTeacherUsers(teacherData?.teachers);
  }, [search, teacherData, tabIndex]);

  const admins = React.useMemo(() => {
    if (tabIndex === TabEnum.TEACHER) {
      return [];
    }
    return sortAdminUsers(filteredAdmins as AdminUser[]);
  }, [filteredAdmins, sortProperty, sortOrder, tabIndex]);

  const teachers = React.useMemo(() => {
    if (tabIndex === TabEnum.ADMIN) {
      return [];
    }
    return sortTeacherUsers(filteredTeachers as TeacherUser[]);
  }, [filteredTeachers, sortProperty, sortOrder, tabIndex]);
  const loading = adminLoading || teacherLoading;
  const error = adminError || teacherError;
  const data = adminData || teacherData;

  const handleTabChange = (index: TabEnum) => {
    setSearch("");
    setSortProperty("firstName");
    setSortOrder("ascending");
    setTabIndex(index);
  };

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
          <Tabs marginTop={3} onChange={handleTabChange} index={tabIndex}>
            <TabList>
              <Tab color={unselectedColor}>Admin</Tab>
              <Tab color={unselectedColor}>Teachers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminTab
                  sortMenuComponent={
                    <SortMenu
                      properties={["firstName", "email"]}
                      onSortProperty={setSortProperty}
                      onSortOrder={setSortOrder}
                    />
                  }
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  UserTable={<AdminUserTable users={admins} />}
                  searchLength={admins.length}
                  search={search}
                />
              </TabPanel>
              <TabPanel>
                <AdminTab
                  sortMenuComponent={
                    <SortMenu
                      properties={["firstName", "email", "school"]}
                      onSortProperty={setSortProperty}
                      onSortOrder={setSortOrder}
                    />
                  }
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  UserTable={<TeacherUserTable users={teachers} />}
                  searchLength={teachers.length}
                  search={search}
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
