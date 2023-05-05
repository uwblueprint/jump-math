import React from "react";
import { HStack } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import StudentDashboardHeader from "../assessments/assessment-creation/StudentDashboardHeader";

import ClassroomCard from "./teacher/classroom/ClassroomCard";
import MobileRedirect from "./MobileRedirect";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <StudentDashboardHeader
        assessmentName="Unit 0 Review Test"
        classroomName="Mathematics 4 - Mr. Roberts"
        estimatedTime="1 Hour"
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
      </HStack>
    </div>
  );
};

export default ComponentLibrary;
