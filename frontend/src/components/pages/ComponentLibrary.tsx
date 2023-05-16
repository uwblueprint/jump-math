import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Center, HStack } from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../APIClients/types/TestClientTypes";
import { Grade } from "../../APIClients/types/UserClientTypes";
import { ClassroomForm } from "../../types/ClassroomTypes";
import { QuestionElementType } from "../../types/QuestionTypes";
import StudentDashboardHeader from "../assessments/assessment-creation/StudentDashboardHeader";
import Question from "../assessments/student-experience/Question";
import ClassroomCard from "../classrooms/ClassroomCard";
import AddClassroomModal from "../user-management/student/AddClassroomModal";
import AddStudentModal from "../user-management/student/AddStudentModal";

import MobileRedirect from "./MobileRedirect";

const defaultValues = {
  className: "",
  schoolYear: "",
  gradeLevel: Grade.K,
} as ClassroomForm;

const ComponentLibrary = (): React.ReactElement => {
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
        <AddClassroomModal />
        <AddStudentModal />
      </HStack>
    </FormProvider>
  );
};

export default ComponentLibrary;
