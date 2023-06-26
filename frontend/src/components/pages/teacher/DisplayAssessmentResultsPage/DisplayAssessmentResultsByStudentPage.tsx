import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { GET_TEST_SESSION_WITH_RESULTS } from "../../../../APIClients/queries/TestSessionQueries";
import type {
  TestSessionResult,
  TestSessionWithResultsData,
} from "../../../../APIClients/types/TestSessionClientTypes";
import {
  NTH_FORMAT,
  PERCENTAGE_FORMAT,
} from "../../../../utils/StatisticsUtils";
import LoadingState from "../../../common/info/LoadingState";
import StatisticsSection, {
  type StatisticsConfig,
} from "../../../data-visualization/StatisticsSection";
import StudentAnswersSection from "../../../teacher/results/StudentAnswersSection";
import StudentList from "../../../teacher/results/StudentList";
import NotFound from "../../NotFound";

const STUDENT_STATISTICS_CONFIG: StatisticsConfig = {
  totalScore: {
    title: "total score",
    formatValue: PERCENTAGE_FORMAT,
  },
  percentile: {
    title: "percentile",
    formatValue: NTH_FORMAT,
  },
};

const DisplayAssessmentResultsByStudentPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data, error, loading } = useQuery<{
    testSession: TestSessionWithResultsData;
  }>(GET_TEST_SESSION_WITH_RESULTS, { variables: { id: sessionId } });

  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const studentsWithViewedState = useMemo(
    () =>
      data?.testSession.results?.map(({ student }) => ({
        ...student,
        // TODO @jfdoming: Replace this with the actual viewed state.
        isViewed: false,
      })) ?? [],
    [data?.testSession.results],
  );

  const studentIdToResultsMap = useMemo(
    () =>
      data?.testSession?.results?.reduce<Record<string, TestSessionResult>>(
        (acc, result) => ({
          ...acc,
          [result.student.id]: result,
        }),
        {},
      ) ?? {},
    [data?.testSession.results],
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    // We're returning not found page because the session id comes from the url.
    return <NotFound />;
  }

  const { result: currentStudentResult, student: currentStudent } =
    studentIdToResultsMap[selectedStudentId] ?? {};

  return (
    <Flex gap={14} h="calc(100vh - 235px)">
      <StudentList
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        students={studentsWithViewedState}
      />
      <Flex align="start" direction="column" flex={1} gap={10}>
        {selectedStudentId ? (
          !currentStudentResult ? (
            <Box>This student has not taken the test yet.</Box>
          ) : (
            <>
              <Text color="blue.300" textStyle="subtitle1">
                {`${currentStudent.lastName}, ${currentStudent.firstName}`}
              </Text>
              <StatisticsSection
                config={STUDENT_STATISTICS_CONFIG}
                values={{
                  totalScore: currentStudentResult.score,
                  percentile: currentStudentResult.percentile,
                }}
              />
              <Divider />
              <StudentAnswersSection />
            </>
          )
        ) : (
          <Box>Select a student to view their results</Box>
        )}
      </Flex>
    </Flex>
  );
};

export default DisplayAssessmentResultsByStudentPage;
