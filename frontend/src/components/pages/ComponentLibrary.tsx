import React from "react";
import { HStack } from "@chakra-ui/react";

import { Grade } from "../../APIClients/types/UserClientTypes";
import ClassroomCard from "../classrooms/ClassroomCard";

import MobileRedirect from "./MobileRedirect";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
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
