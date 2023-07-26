import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import { PlusOutlineIcon } from "../../assets/icons";
import type { ClassroomForm } from "../../types/ClassroomTypes";
import MultipleChoiceVisualizer from "../admin/assessment-visualization/question-elements/MultipleChoiceVisualizer";
import MultiSelectVisualizer from "../admin/assessment-visualization/question-elements/MultiSelectVisualizer";
import ShortAnswerVisualizer from "../admin/assessment-visualization/question-elements/ShortAnswerVisualizer";
import ChartSection from "../data-visualization/ChartSection";
import StatisticCard from "../data-visualization/StatisticCard";
import CorrectedMultipleChoice from "../teacher/results/StudentAnswersSection/question-elements/CorrectedMultipleChoice";
import CorrectedMultiSelect from "../teacher/results/StudentAnswersSection/question-elements/CorrectedMultiSelect";
import CorrectedShortAnswer from "../teacher/results/StudentAnswersSection/question-elements/CorrectedShortAnswer";
import StudentList from "../teacher/results/StudentList";
import AddStudentModal from "../teacher/student-management/AddStudentModal";
import AddOrEditClassroomModal from "../teacher/student-management/classroom-summary/AddOrEditClassroomModal";
import ClassroomCard from "../teacher/student-management/classroom-summary/ClassroomCard";

const defaultValues = {
  className: "",
  startDate: new Date(),
  gradeLevel: Grade.KINDERGARTEN,
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
  const {
    onClose: onStudentModalClose,
    isOpen: isStudentModalOpen,
    onOpen: onStudentModalOpen,
  } = useDisclosure();
  const methods = useForm<ClassroomForm>({
    defaultValues,
    mode: "onChange",
  });
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    MOCK_STUDENTS[0].id,
  );
  return (
    <FormProvider {...methods}>
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
      <HStack justifyContent="center">
        <ClassroomCard
          activeAssessments={2}
          assessmentCount={1}
          grade={Grade.GRADE_4}
          id=""
          name="Counting and Numbers"
          studentCount={23}
        />
        <ClassroomCard
          activeAssessments={0}
          assessmentCount={3}
          grade={Grade.GRADE_8}
          id=""
          name="Sorting and Classifying"
          studentCount={14}
        />
        <AddOrEditClassroomModal isOpen={isOpen} onClose={onClose} />
        <Button
          my={2}
          onClick={onStudentModalOpen}
          rightIcon={<PlusOutlineIcon />}
          variant="primary"
        >
          Add Students
        </Button>
        <AddStudentModal
          classId="642b8eb6bfc20e04f56c2a46"
          isOpen={isStudentModalOpen}
          onClose={onStudentModalClose}
        />
      </HStack>
      <ChartSection />
      <ShortAnswerVisualizer correctAnswer={10293} percentCorrect={86} />
      <ShortAnswerVisualizer correctAnswer={10293} />
      <MultipleChoiceVisualizer
        correctAnswerIndex={0}
        options={[3683, 3683, 3683, 3683]}
        percentCorrectByOption={[77, 17, 0, 5]}
      />
      <MultipleChoiceVisualizer
        correctAnswerIndex={0}
        options={[3683, 3683, 3683, 3683]}
      />
      <MultiSelectVisualizer
        correctAnswerIndices={[0, 2]}
        options={[3683, 3683, 3683, 3683]}
        percentCorrectByOption={[77, 17, 0, 5]}
      />
      <MultiSelectVisualizer
        correctAnswerIndices={[0, 2]}
        options={[3683, 3683, 3683, 3683]}
      />
    </FormProvider>
  );
};

export default ComponentLibrary;
