import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HStack } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import { ClassroomForm } from "../../types/ClassroomTypes";
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
