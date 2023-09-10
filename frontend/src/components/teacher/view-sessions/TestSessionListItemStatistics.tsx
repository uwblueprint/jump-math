import React from "react";
import { Text } from "@chakra-ui/react";

import type { TestSessionItemStats } from "../../../types/TestSessionTypes";

const TestSessionListItemStatistics = ({
  stats,
}: {
  stats: TestSessionItemStats;
}): React.ReactElement => {
  return (
    <>
      <Text color="grey.300" textStyle="mobileParagraph">
        Mean: {stats.mean}%
      </Text>
      <Text color="grey.300" textStyle="mobileParagraph">
        Median: {stats.median}%
      </Text>
      <Text color="grey.300" textStyle="mobileParagraph">
        Completion Rate: {stats.completionRate}%
      </Text>
      <Text color="grey.300" textStyle="mobileParagraph">
        Submissions: {stats.submissions}
      </Text>
    </>
  );
};

export default TestSessionListItemStatistics;
