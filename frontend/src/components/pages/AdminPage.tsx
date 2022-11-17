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
} from "@chakra-ui/react";
import SideBar from "../common/Sidebar";

import Page from "../../types/PageTypes";
import AdminUserTable from "../common/AdminUserTable";
import AddAdminModal from "../common/AddAdminModal";
import { SettingsOutlineIcon } from "../common/icons";

const pages: Page[] = [
  { title: "Assessments", url: "/", icon: SettingsOutlineIcon },
  { title: "Database", url: "/", icon: SettingsOutlineIcon },
];

const USERS = [
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its existence, Chakra was created.",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
  {
    firstName: "Albert",
    lastName: "Kuhl",
    email: "albertkuhl@jumpmath.ca",
  },
];

const AdminPage = (): React.ReactElement => {
  const unselectedColor = useColorModeValue("#727278", "#727278");
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
              <AdminUserTable adminUsers={USERS} />
            </TabPanel>
            <TabPanel>
              <AdminUserTable adminUsers={USERS} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AdminPage;
