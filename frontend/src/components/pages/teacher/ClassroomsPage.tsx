import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { TabEnum } from "../../../types/AuthTypes";
import AddClassroomModal from "../../user-management/student/AddClassroomModal";

const ClassroomsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
  const [tabIndex, setTabIndex] = React.useState<TabEnum>(TabEnum.ACTIVE);
  const methods = useForm();

  const handleTabChange = (index: TabEnum) => {
    setTabIndex(index);
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <HStack justifyContent="space-between">
          <Text
            color="blue.300"
            marginBottom="0.5em"
            style={{ textAlign: "left" }}
            textStyle="header4"
          >
            Classroom
          </Text>
          <AddClassroomModal />
        </HStack>
      </Box>
      <Box flex="1">
        <Tabs index={tabIndex} marginTop={3} onChange={handleTabChange}>
          <TabList>
            <Tab color={unselectedTabColor}>Active</Tab>
            <Tab color={unselectedTabColor}>Archived</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <h1>test</h1>
            </TabPanel>
            <TabPanel padding="0">
              <h1>yert</h1>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </FormProvider>
  );
};

export default ClassroomsPage;
