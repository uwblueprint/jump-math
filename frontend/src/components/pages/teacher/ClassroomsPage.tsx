import React from "react";
import { FormProvider, useForm } from "react-hook-form";
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

import { TabEnum } from "../../../types/AuthTypes";
import { ClassroomForm } from "../../../types/ClassroomTypes";
import AddClassroomModal from "../../user-management/student/AddClassroomModal";

const ClassroomsPage = (): React.ReactElement => {
  const unselectedTabColor = "#727278";
  const [tabIndex, setTabIndex] = React.useState<TabEnum>(TabEnum.ADMIN);
  const methods = useForm();

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
        <Tabs index={tabIndex} marginTop={3}>
          <TabList>
            <Tab color={unselectedTabColor}>Active</Tab>
            <Tab color={unselectedTabColor}>Archived</Tab>
          </TabList>
        </Tabs>
      </Box>
    </FormProvider>
  );
};

export default ClassroomsPage;
