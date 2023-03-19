import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../../APIClients/queries/UserQueries";
import { TabEnum } from "../../../types/AuthTypes";
import { AdminUser, TeacherUser } from "../../../types/UserTypes";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";
import AddAdminModal from "../../user-management/admin/AddAdminModal";
import AdminTab from "../../user-management/admin/AdminTab";
import AdminUserTable from "../../user-management/admin/AdminUserTable";
import TeacherUserTable from "../../user-management/teacher/TeacherUserTable";

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
  const unselectedTabColor = "#727278";
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
            color="blue.300"
            marginBottom="0.5em"
            style={{ textAlign: "left" }}
            textStyle="header4"
          >
            Database
          </Text>
          <AddAdminModal />
        </HStack>
      </Box>
      {loading && (
        <Center flex="1" margin="15%">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Center flex="1" margin="15%">
          <ErrorState />
        </Center>
      )}
      {data && !error && !loading && (
        <Box flex="1">
          <Tabs index={tabIndex} marginTop={3} onChange={handleTabChange}>
            <TabList>
              <Tab color={unselectedTabColor}>Admin</Tab>
              <Tab color={unselectedTabColor}>Teachers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminTab
                  search={search}
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  searchLength={admins.length}
                  sortMenuComponent={
                    <SortMenu
                      onSortOrder={setSortOrder}
                      onSortProperty={setSortProperty}
                      properties={["firstName", "email"]}
                    />
                  }
                  UserTable={<AdminUserTable users={admins} />}
                />
              </TabPanel>
              <TabPanel>
                <AdminTab
                  search={search}
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  searchLength={teachers.length}
                  sortMenuComponent={
                    <SortMenu
                      onSortOrder={setSortOrder}
                      onSortProperty={setSortProperty}
                      properties={["firstName", "email", "school"]}
                    />
                  }
                  UserTable={<TeacherUserTable users={teachers} />}
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
