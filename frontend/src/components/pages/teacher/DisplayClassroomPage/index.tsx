import React from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { Flex, IconButton, Tag } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import * as Routes from "../../../../constants/Routes";
import {
  formatMonth,
  removeUnderscore,
  titleCase,
} from "../../../../utils/GeneralUtils";
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
      const { classroomId } = useParams<{ classroomId: string }>();
      const location = useLocation();
      return (
        <Redirect
          to={{
            pathname: Routes.DISPLAY_CLASSROOM_STUDENTS_PAGE(classroomId),
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

const BREADCRUMB_CONFIG = (className?: string) => [
  {
    header: "Classrooms",
    page: 0,
  },
  {
    header: className,
    page: 1,
  },
];

const getLocationState = (
  state: unknown,
): { className?: string; startDate?: string; grade?: string } => ({
  className: undefined,
  startDate: undefined,
  grade: undefined,
  ...(typeof state === "object" ? state : {}),
});

const DisplayClassroomsPage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { className, startDate, grade } = getLocationState(state);
  const loading = !className;

  return (
    <Flex direction="column" gap={3}>
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG(className)}
        page={1}
        setPage={(newPage) => !newPage && history.push(Routes.CLASSROOMS_PAGE)}
      />
      <HeaderWithButton
        button={<AddClassroomOrStudentPopover disabled={loading} />}
        isLoading={loading}
        title={className}
      >
        {startDate && (
          <Tag bg="blue.50" color="blue.300" size="lg">
            {formatMonth(new Date(startDate))}
          </Tag>
        )}
        {grade && (
          <Tag bg="green.50" color="green.400" size="lg">
            {titleCase(removeUnderscore(grade))}
          </Tag>
        )}
        {!loading && (
          <IconButton
            aria-label="Edit classroom"
            color="blue.300"
            icon={<EditOutlineIcon />}
            minW={0}
          />
        )}
      </HeaderWithButton>
      <RouterTabs routes={TAB_CONFIG} />
    </Flex>
  );
};

export default DisplayClassroomsPage;
