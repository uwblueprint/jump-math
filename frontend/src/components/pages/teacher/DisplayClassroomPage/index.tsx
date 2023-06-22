import React from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import * as Routes from "../../../../constants/Routes";
import HeaderWithButton from "../../../common/HeaderWithButton";
import FormBreadcrumb from "../../../common/navigation/FormBreadcrumb";
import RouterTabs from "../../../common/navigation/RouterTabs";
import AddClassroomOrStudentPopover from "../../../teacher/student-management/classrooms/AddClassroomOrStudentPopover";
import NotFound from "../../NotFound";

import DisplayClassroomAssessmentsPage from "./DisplayClassroomAssessmentsPage";
import DisplayClassroomStudentsPage from "./DisplayClassroomStudentsPage";

const TAB_CONFIG = [
  {
    name: "Assessments",
    path: Routes.DISPLAY_CLASSROOM_ASSESSMENTS_PAGE(),
    Component: DisplayClassroomAssessmentsPage,
  },
  {
    name: "Students",
    path: Routes.DISPLAY_CLASSROOM_STUDENTS_PAGE(),
    Component: DisplayClassroomStudentsPage,
  },
  {
    path: Routes.DISPLAY_CLASSROOM_PAGE(),
    exact: true,
    Component: () => {
      const { sessionId } = useParams<{ sessionId: string }>();
      const location = useLocation();
      return (
        <Redirect
          to={{
            pathname: Routes.DISPLAY_CLASSROOM_STUDENTS_PAGE(sessionId),
            state: location.state,
          }}
        />
      );
    },
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const BREADCRUMB_CONFIG = (className: string) => [
  {
    header: "Classrooms",
    page: 0,
  },
  {
    header: className,
    page: 1,
  },
];

const getLocationState = (state: unknown): { className?: string } => ({
  className: undefined,
  ...(typeof state === "object" ? state : {}),
});

const DisplayAssessmentResults = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { className } = getLocationState(state);

  const classTitle = className;
  const effectiveTitle = classTitle ?? "Loading...";
  return (
    <Flex direction="column" gap={3}>
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG(effectiveTitle)}
        page={1}
        setPage={(newPage) => !newPage && history.push(Routes.CLASSROOMS_PAGE)}
      />
      <HeaderWithButton
        button={<AddClassroomOrStudentPopover />}
        isLoading={!className}
        title={effectiveTitle}
      />
      <RouterTabs routes={TAB_CONFIG} />
    </Flex>
  );
};

export default DisplayAssessmentResults;
