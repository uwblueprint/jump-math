import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";

import BarGraph from "./BarGraph";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.defaults.font.family = "DM Sans";

const Chart = (): React.ReactElement => {
  const markDistribution: number[] = [
    43, 40, 53, 89, 63, 90, 29, 23, 58, 10, 19,
  ];
  const performanceByQuestion: number[] = [
    29, 38, 51, 12, 40, 94, 80, 19, 23, 20, 95, 32, 90, 58, 20, 42,
  ];

  return (
    <Box>
      <Text color="grey.300" pb="1.5em" pl="4em" textStyle="eyebrow">
        Charts
      </Text>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Mark Distribution</Tab>
          <Tab>Performance by Question</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BarGraph
              dataset={markDistribution}
              label="Mark Distribution"
              xAxisLabel="Assessment mark"
              xAxisTickLabels={Array.from(
                { length: 11 },
                (_, i) => `${i * 10}%`,
              )}
              yAxisLabel="% of students"
            />
          </TabPanel>
          <TabPanel>
            <BarGraph
              dataset={performanceByQuestion}
              label="Question"
              xAxisLabel="Question"
              xAxisTickLabels={Array.from(
                { length: performanceByQuestion.length },
                (_, i) => `Q${i + 1}`,
              )}
              yAxisLabel="Mean mark"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Chart;
