import React from "react";

import StudentDashboardHeader from "../assessments/assessment-creation/StudentDashboardHeader";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <StudentDashboardHeader
      assessmentName="Unit 0 Review Test"
      classroomName="Mathematics 4 - Mr. Roberts"
      estimatedTime="1 Hour"
    />
  );
};

export default ComponentLibrary;
