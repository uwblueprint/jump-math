import React from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import {
  NTH_FORMAT,
  PERCENTAGE_FORMAT,
} from "../../../../utils/StatisticsUtils";
import StatisticsSection, {
  type StatisticsConfig,
} from "../../../data-visualization/StatisticsSection";
import StudentAnswersSection from "../../../teacher/results/StudentAnswersSection";
import StudentList from "../../../teacher/results/StudentList";

const MOCK_STUDENTS = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: "238",
    isViewed: false,
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    studentNumber: "239",
    isViewed: true,
  },
  {
    id: "3",
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: "240",
    isViewed: false,
  },
  {
    id: "4",
    firstName: "John",
    lastName: "Doe",
    studentNumber: "241",
    isViewed: true,
  },
  {
    id: "5",
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: "242",
    isViewed: false,
  },
  {
    id: "6",
    firstName: "John",
    lastName: "Doe",
    studentNumber: "243",
    isViewed: true,
  },
  {
    id: "7",
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: "244",
    isViewed: false,
  },
  {
    id: "8",
    firstName: "John",
    lastName: "Doe",
    studentNumber: "245",
    isViewed: true,
  },
  {
    id: "9",
    firstName: "Jane",
    lastName: "Doe",
    studentNumber: "246",
    isViewed: false,
  },
  {
    id: "10",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "247",
    isViewed: true,
  },
  {
    id: "11",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "248",
    isViewed: false,
  },
  {
    id: "12",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "249",
    isViewed: true,
  },
  {
    id: "13",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "250",
    isViewed: false,
  },
  {
    id: "14",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "251",
    isViewed: true,
  },
  {
    id: "15",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "252",
    isViewed: false,
  },
  {
    id: "16",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "253",
    isViewed: true,
  },
  {
    id: "17",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "254",
    isViewed: false,
  },
  {
    id: "18",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "255",
    isViewed: true,
  },
  {
    id: "19",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "256",
    isViewed: false,
  },
  {
    id: "20",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "257",
    isViewed: true,
  },
  {
    id: "21",
    firstName: "Z",
    lastName: "Z",
    studentNumber: "258",
    isViewed: false,
  },
];

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
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>();

  const students = MOCK_STUDENTS;
  const idToStudentMap = React.useMemo(
    () =>
      students.reduce((acc, student) => {
        acc[student.id] = student;
        return acc;
      }, {} as Record<string, (typeof students)[number]>),
    [students],
  );
  const currentStudent = idToStudentMap[selectedStudentId || ""];

  return (
    <Flex gap={14} h="calc(100vh - 235px)">
      <StudentList
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        students={students}
      />
      <Flex align="start" direction="column" flex={1} gap={10}>
        {selectedStudentId ? (
          <>
            <Text color="blue.300" textStyle="subtitle1">
              {`${currentStudent.lastName}, ${currentStudent.firstName}`}
            </Text>
            <StatisticsSection
              config={STUDENT_STATISTICS_CONFIG}
              values={{ totalScore: 50, percentile: 10 }}
            />
            <Divider />
            <StudentAnswersSection />
          </>
        ) : (
          <Box>Select a student to view their results</Box>
        )}
      </Flex>
    </Flex>
  );
};

export default DisplayAssessmentResultsByStudentPage;
