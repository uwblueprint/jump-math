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
import { sortArray } from "../../../utils/GeneralUtils";
import {
  filterAdminUsersBySearch,
  filterTeacherUsersBySearch,
} from "../../../utils/UserUtils";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";
import AddAdminModal from "../../user-management/admin/AddAdminModal";
import AdminTab from "../../user-management/admin/AdminTab";
import AdminUserTable from "../../user-management/admin/AdminUserTable";
import TeacherUserTable from "../../user-management/teacher/TeacherUserTable";

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
  } = useQuery<{ usersByRole: AdminUser[] }>(GET_USERS_BY_ROLE, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
  });

  const {
    loading: teacherLoading,
    error: teacherError,
    data: teacherData,
  } = useQuery<{ teachers: TeacherUser[] }>(GET_ALL_TEACHERS, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Teacher" },
  });

  const filteredAdmins: AdminUser[] = React.useMemo(() => {
    if (tabIndex === TabEnum.TEACHER || !adminData?.usersByRole) {
      return [];
    }
    return filterAdminUsersBySearch(adminData.usersByRole, search);
  }, [search, adminData, tabIndex]);

  const filteredTeachers: TeacherUser[] = React.useMemo(() => {
    if (tabIndex === TabEnum.ADMIN || !teacherData?.teachers) {
      return [];
    }
    return filterTeacherUsersBySearch(teacherData.teachers, search);
  }, [search, teacherData, tabIndex]);

  const admins: AdminUser[] = React.useMemo(() => {
    if (tabIndex === TabEnum.TEACHER) {
      return [];
    }
    return sortArray<AdminUser>(filteredAdmins, sortProperty, sortOrder);
  }, [filteredAdmins, sortProperty, sortOrder, tabIndex]);

  const teachers: TeacherUser[] = React.useMemo(() => {
    if (tabIndex === TabEnum.ADMIN) {
      return [];
    }
    return sortArray<TeacherUser>(filteredTeachers, sortProperty, sortOrder);
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
              <TabPanel padding="0">
                <AdminTab
                  search={search}
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  searchLength={admins.length}
                  sortMenuComponent={
                    <SortMenu
                      labels={["name", "email"]}
                      onSortOrder={setSortOrder}
                      onSortProperty={setSortProperty}
                      properties={["firstName", "email"]}
                    />
                  }
                  UserTable={<AdminUserTable users={admins} />}
                />
              </TabPanel>
              <TabPanel padding="0">
                <AdminTab
                  search={search}
                  searchBarComponent={<SearchBar onSearch={setSearch} />}
                  searchLength={teachers.length}
                  sortMenuComponent={
                    <SortMenu
                      labels={["name", "email", "school"]}
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
