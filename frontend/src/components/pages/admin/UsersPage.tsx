import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import {
  GET_ALL_TEACHERS,
  GET_USERS_BY_ROLE,
} from "../../../APIClients/queries/UserQueries";
import { TabEnum } from "../../../types/AuthTypes";
import type { AdminUser, TeacherUser } from "../../../types/UserTypes";
import { sortArray } from "../../../utils/GeneralUtils";
import {
  filterAdminUsersBySearch,
  filterTeacherUsersBySearch,
} from "../../../utils/UserUtils";
import AdminTab from "../../admin/user-management/admin/AdminTab";
import AdminUserTable from "../../admin/user-management/admin/AdminUserTable";
import TeacherUserTable from "../../admin/user-management/teacher/TeacherUserTable";
import UsersPageHeader from "../../admin/user-management/UsersPageHeader";
import QueryStateHandler from "../../common/QueryStateHandler";
import SearchBar from "../../common/table/SearchBar";
import SortMenu, { type SortOrder } from "../../common/table/SortMenu";
import useSortProperty from "../../common/table/useSortProperty";

const TEACHER_SORT_PROPERTIES = ["firstName", "email", "school"] as const;
const ADMIN_SORT_PROPERTIES = ["firstName", "email"] as const;

const UsersPage = (): React.ReactElement => {
  const [search, setSearch] = React.useState("");
  const [teacherSortProperty, setTeacherSortProperty] = useSortProperty(
    "firstName",
    TEACHER_SORT_PROPERTIES,
  );
  const [adminSortProperty, setAdminSortProperty] = useSortProperty(
    "firstName",
    ADMIN_SORT_PROPERTIES,
  );
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ascending");
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
    return sortArray(filteredAdmins, adminSortProperty, sortOrder);
  }, [filteredAdmins, adminSortProperty, sortOrder, tabIndex]);

  const teachers: TeacherUser[] = React.useMemo(() => {
    if (tabIndex === TabEnum.ADMIN) {
      return [];
    }
    return sortArray(filteredTeachers, teacherSortProperty, sortOrder);
  }, [filteredTeachers, teacherSortProperty, sortOrder, tabIndex]);

  const loading = adminLoading || teacherLoading;
  const error = adminError || teacherError;
  const data = adminData || teacherData;

  const handleTabChange = (index: TabEnum) => {
    setSearch("");
    setTeacherSortProperty("firstName");
    setAdminSortProperty("firstName");
    setSortOrder("ascending");
    setTabIndex(index);
  };

  return (
    <>
      <UsersPageHeader />
      <QueryStateHandler error={error} loading={loading}>
        {data && (
          <Box flex="1">
            <Tabs index={tabIndex} marginTop={3} onChange={handleTabChange}>
              <TabList>
                <Tab>Admins</Tab>
                <Tab>Teachers</Tab>
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
                        onSortProperty={setAdminSortProperty}
                        properties={ADMIN_SORT_PROPERTIES}
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
                        onSortProperty={setTeacherSortProperty}
                        properties={TEACHER_SORT_PROPERTIES}
                      />
                    }
                    UserTable={<TeacherUserTable users={teachers} />}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </QueryStateHandler>
    </>
  );
};

export default UsersPage;
