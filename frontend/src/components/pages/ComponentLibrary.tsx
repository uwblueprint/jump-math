import React from "react";

import StudentDashboardInfo from "../../types/StudentDashboardInfoTypes";
import Navbar from "../common/Navbar";

const ComponentLibrary = (): React.ReactElement => {
  const info: StudentDashboardInfo = {
    assessmentName: "Unit 0 Review Test",
    classroomName: "Mathematics 4 - Mr.Roberts",
    estimatedTime: "1 Hour",
  };
  return <Navbar data={info} />;
};

export default ComponentLibrary;
