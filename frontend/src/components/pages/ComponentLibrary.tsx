import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HStack, useDisclosure } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import type { ClassroomForm } from "../../types/ClassroomTypes";
import StudentDashboardHeader from "../assessments/assessment-creation/StudentDashboardHeader";
import ClassroomCard from "../classrooms/ClassroomCard";
import CorrectedShortAnswer from "../sessions/results/CorrectedShortAnswer";
import StatisticCard from "../sessions/results/StatisticCard";
import AddClassroomModal from "../user-management/student/AddClassroomModal";
import AddStudentModal from "../user-management/student/AddStudentModal";

import MobileRedirect from "./MobileRedirect";

const defaultValues = {
  className: "",
  schoolYear: "",
  gradeLevel: Grade.K,
} as ClassroomForm;

const ComponentLibrary = (): React.ReactElement => {
  const { onClose, isOpen } = useDisclosure();
  const methods = useForm<ClassroomForm>({
    defaultValues,
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <StudentDashboardHeader
        assessmentName="Unit 0 Review Test"
        classroomName="Mathematics 4 - Mr. Roberts"
      />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={1024} />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={1023} />
      <CorrectedShortAnswer correctAnswer={1024} studentAnswer={undefined} />
      <StatisticCard title="total score" value="87%" />
      <StatisticCard title="percentile" value="25th" />
      <StatisticCard title="submissions" value="1087" variant="blue" />
      <StatisticCard title="completion rate" value="78%" variant="blue" />
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
