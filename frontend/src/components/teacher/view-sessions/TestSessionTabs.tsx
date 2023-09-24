import type { ReactElement } from "react";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import type { TestSessionStatus } from "../../../types/TestSessionTypes";
import { TEST_SESSION_STATUSES } from "../../../types/TestSessionTypes";
import { titleCase } from "../../../utils/GeneralUtils";
import EmptySessionsTabMessage from "../../common/info/messages/EmptySessionsTabMessage";

import TestSessionListItem from "./TestSessionListItem";
import type { FormattedAssessmentData } from "./useAssessmentDataQuery";

type TestSessionTabsProps = {
  data?: FormattedAssessmentData[];
  setCurrentTab: (status: TestSessionStatus) => void;
};

const TestSessionTabs = ({
  data,
  setCurrentTab,
}: TestSessionTabsProps): ReactElement => (
  <Tabs
    mt={2}
    onChange={(index) => setCurrentTab(TEST_SESSION_STATUSES[index])}
  >
    <TabList>
      {TEST_SESSION_STATUSES.map((status) => (
        <Tab key={status}>{titleCase(status)}</Tab>
      ))}
    </TabList>
    <TabPanels>
      {TEST_SESSION_STATUSES.map((status) => (
        <TabPanel key={status} px={0}>
          {data?.length ? (
            data.map((session) => (
              <TestSessionListItem
                key={session.testSessionId}
                session={session}
              />
            ))
          ) : (
            <EmptySessionsTabMessage status={status} />
          )}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);

export default TestSessionTabs;
