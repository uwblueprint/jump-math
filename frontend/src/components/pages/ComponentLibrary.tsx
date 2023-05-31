import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, HStack, useDisclosure } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import type { ClassroomForm } from "../../types/ClassroomTypes";
import StudentDashboardHeader from "../assessments/assessment-creation/StudentDashboardHeader";
import MobileRedirect from "../common/messages/MobileRedirectMessage";
import StatisticCard from "../data-visualization/StatisticCard";
import CorrectedMultipleChoice from "../sessions/results/StudentAnswersSection/question-elements/CorrectedMultipleChoice";
import CorrectedMultiSelect from "../sessions/results/StudentAnswersSection/question-elements/CorrectedMultiSelect";
import CorrectedShortAnswer from "../sessions/results/StudentAnswersSection/question-elements/CorrectedShortAnswer";
import StudentList from "../sessions/results/StudentList";
import AddStudentModal from "../user-management/student/AddStudentModal";
import AddClassroomModal from "../user-management/student/classrooms/AddClassroomModal";
import ClassroomCard from "../user-management/student/classrooms/ClassroomCard";

const defaultValues = {
  className: "",
  schoolYear: "",
  gradeLevel: Grade.K,
} as ClassroomForm;

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
];

const ComponentLibrary = (): React.ReactElement => {
  const { onClose, isOpen } = useDisclosure();
  const methods = useForm<ClassroomForm>({
    defaultValues,
    mode: "onChange",
  });
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    MOCK_STUDENTS[0].id,
  );
  return (
    <FormProvider {...methods}>
      <StudentDashboardHeader
        assessmentName="Unit 0 Review Test"
        classroomName="Mathematics 4 - Mr. Roberts"
      />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={1024} />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={1023} />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={undefined} />
      <CorrectedMultipleChoice
        correctAnswerIndex={1}
        options={["A", "B", "C", "D"]}
        studentAnswerIndex={1}
      />
      <CorrectedMultipleChoice
        correctAnswerIndex={1}
        options={["A", "B", "C", "D"]}
        studentAnswerIndex={2}
      />
      <CorrectedMultipleChoice
        correctAnswerIndex={1}
        options={["A", "B", "C", "D"]}
      />
      <CorrectedMultiSelect
        correctAnswerIndices={[1, 2]}
        options={["A", "B", "C", "D"]}
        studentAnswerIndices={[1, 2]}
      />
      <CorrectedMultiSelect
        correctAnswerIndices={[1, 2]}
        options={["A", "B", "C", "D"]}
        studentAnswerIndices={[2, 3]}
      />
      <StatisticCard title="total score" value="87%" />
      <StatisticCard title="percentile" value="25th" />
      <StatisticCard title="submissions" value="1087" variant="blue" />
      <StatisticCard title="completion rate" value="78%" variant="blue" />
      <Box height="20vh">
        <StudentList
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          students={MOCK_STUDENTS}
        />
      </Box>
      <MobileRedirect />
      <HStack justifyContent="center">
        <ClassroomCard
          activeAssessments={2}
          assessmentCount={1}
          grade={Grade.GRADE_4}
          name="Counting and Numbers"
          studentCount={23}
        />
        <ClassroomCard
          activeAssessments={0}
          assessmentCount={3}
          grade={Grade.GRADE_8}
          name="Sorting and Classifying"
          studentCount={14}
        />
        <AddClassroomModal isOpen={isOpen} onClose={onClose} />
        <AddStudentModal />
      </HStack>
    </FormProvider>
  );
};

export default ComponentLibrary;
