import React from "react";

import * as Routes from "../../../../constants/Routes";
import RouterTabs from "../../../common/RouterTabs";
import NotFound from "../../NotFound";

import DisplayAssessmentResultsByStudentPage from "./DisplayAssessmentResultsByStudentPage";
import DisplayAssessmentResultsSummaryPage from "./DisplayAssessmentResultsSummaryPage";

const TAB_CONFIG = [
  {
    name: "Summary",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE,
    component: DisplayAssessmentResultsSummaryPage,
  },
  {
    name: "Student",
    path: Routes.DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE,
    component: DisplayAssessmentResultsByStudentPage,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const DisplayAssessmentResults = () => {
  return <RouterTabs routes={TAB_CONFIG} />;
};

export default DisplayAssessmentResults;
