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
import * as Routes from "../../constants/Routes";
import { AdminUser } from "../../types/UserTypes";
import AdminUserTable from "../user-management/AdminUserTable";
import AddAdminModal from "../user-management/AddAdminModal";
import { AlertIcon, SearchOutlineIcon } from "../../assets/icons";
import { GET_USERS_BY_ROLE } from "../../APIClients/queries/UserQueries";
import SortTablePopover from "../common/SortTablePopover";
import CreateAssessementModel from "./CreateAssessementModal";
import LoadingState from "../common/LoadingState";
import Page from "../../types/PageTypes";
import Navbar from "../common/Navbar";
import AssessmentTable from "./AssessmentTable";
import { AssessmentType } from "../../types/AssessmentType";
import FilterTablePopover from "./FilterTablePopover";

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

const data3: AssessmentType[] = [
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
  {
    status: "Draft",
    name: "Grade 5 Ontario Pre-Term Assessment 2016",
    grade: "Grade 5",
    type: "Beginning",
    country: "Canada",
    region: "Ontario",
  },
  {
    status: "Draft",
    name: "Grade 7 Ontario Pre-Term Assessment 2016",
    grade: "Grade 7",
    type: "Beginning",
    country: "USA",
    region: "California",
  },
];

type AdminUserProperty = "firstName" | "email";
type SortOrder = "Ascending" | "Descending";

const DisplayAssessmentsPage = (): React.ReactElement => {
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

  // const { loading, error, data } = useQuery(GET_USERS_BY_ROLE, {
  //   fetchPolicy: "cache-and-network",
  //   variables: { role: "Admin" },
  // });

  // const filteredAdmins = React.useMemo(() => {
  //   let filteredUsers = data3;
  //   if (search) {
  //     filteredUsers = filteredUsers.filter(
  //       (user: AdminUser) =>
  //         `${user.firstName} ${user.lastName}`
  //           .toLowerCase()
  //           .includes(search.toLowerCase()) ||
  //         user.email.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }
  //   return filteredUsers?.map(getAdminUser);
  // }, [search, data3]);

  // const admins = React.useMemo(() => {
  //   let sortedUsers: AdminUser[] = filteredAdmins as AdminUser[];
  //   if (sortOrder === "Descending") {
  //     sortedUsers = sortedUsers?.sort((a, b) =>
  //       a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase() ? 1 : -1,
  //     );
  //   } else if (sortOrder === "Ascending") {
  //     sortedUsers = sortedUsers?.sort((a, b) =>
  //       a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase() ? 1 : -1,
  //     );
  //   }
  //   return sortedUsers;
  // }, [filteredAdmins, sortProperty, sortOrder]);

  return (
    <>
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
                Assessments
              </Text>
              <CreateAssessementModel />
            </HStack>
          </Box>
          {/* {loading && (
        <Center margin="15%" flex="1">
          <LoadingState />
        </Center>
      )}
      {error && (
        <Center margin="15%" flex="1">
          <ErrorState />
        </Center>
      )} */}
          {/* {data3 && !error && !loading && ( */}
          <Box flex="1">
            <Tabs marginTop={3}>
              <TabList>
                <Tab color={unselectedColor}>All</Tab>
                <Tab color={unselectedColor}>Drafts</Tab>
                <Tab color={unselectedColor}>Published</Tab>
                <Tab color={unselectedColor}>Archived</Tab>
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
                          placeholder="Search bar"
                        />
                        <InputRightElement pointerEvents="none" h="full">
                          <SearchOutlineIcon />
                        </InputRightElement>
                      </InputGroup>
                      <SortTablePopover OrderingSets={OrderingSets} />
                      <FilterTablePopover />
                    </HStack>
                    {search && (
                      <Text fontSize="16px" color="grey.300" width="100%">
                        Showing {data3.length} results for &quot;{search}&quot;
                      </Text>
                    )}
                    <AssessmentTable assessments={data3} />
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <AssessmentTable assessments={data3} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          {/* )} */}
        </Box>
      </VStack>
    </>
  );
};

export default DisplayAssessmentsPage;
