import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Flex, IconButton, Tag, useDisclosure } from "@chakra-ui/react";

import { GET_CLASS_DETAILS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { ClassTitleData } from "../../../../APIClients/types/ClassClientTypes";
import { EditOutlineIcon } from "../../../../assets/icons";
import * as Routes from "../../../../constants/Routes";
import type { StudentForm } from "../../../../types/ClassroomTypes";
import {
  formatMonth,
  removeUnderscore,
  titleCase,
} from "../../../../utils/GeneralUtils";
import HeaderWithButton from "../../../common/HeaderWithButton";
import FormBreadcrumb from "../../../common/navigation/FormBreadcrumb";
import RouterTabs from "../../../common/navigation/RouterTabs";
import AddStudentModal from "../../../teacher/student-management/AddStudentModal";
import AddClassroomOrStudentPopover from "../../../teacher/student-management/view-students/AddClassroomOrStudentPopover";
import NotFound from "../../NotFound";
import RedirectTo from "../../RedirectTo";

import DisplayClassroomAssessmentsPage from "./DisplayClassroomAssessmentsPage";
import DisplayClassroomStudentsPage from "./DisplayClassroomStudentsPage";

const TAB_CONFIG = (onCreateStudent: () => void) => [
  {
    name: "Assessments",
    path: Routes.DISPLAY_CLASSROOM_ASSESSMENTS_PAGE(),
    Component: DisplayClassroomAssessmentsPage,
  },
  {
    name: "Students",
    path: Routes.DISPLAY_CLASSROOM_STUDENTS_PAGE(),
    element: <DisplayClassroomStudentsPage onCreateStudent={onCreateStudent} />,
  },
  {
    path: Routes.DISPLAY_CLASSROOM_PAGE(),
    exact: true,
    element: <RedirectTo pathname={Routes.DISPLAY_CLASSROOM_STUDENTS_PAGE} />,
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

const defaultValues: StudentForm = {
  firstName: "",
  lastName: "",
  studentNumber: undefined,
};

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
  const { classroomId } = useParams<{ classroomId: string }>();
  const { state } = useLocation();
  const { className, startDate, grade } = getLocationState(state);

  const { data } = useQuery<{ class: ClassTitleData }>(
    GET_CLASS_DETAILS_BY_ID,
    {
      variables: { classroomId },
      skip: !!className,
    },
  );
  const displayTitle = data?.class.className ?? className;
  const loading = !displayTitle;

  const {
    isOpen: isStudentModalOpen,
    onClose: onStudentModalClose,
    onOpen: onStudentModalOpen,
  } = useDisclosure();
  const studentFormMethods = useForm<StudentForm>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <Flex direction="column" gap={3}>
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG(displayTitle)}
        page={1}
        setPage={(newPage) => !newPage && history.push(Routes.CLASSROOMS_PAGE)}
      />
      <HeaderWithButton
        button={
          <AddClassroomOrStudentPopover
            isDisabled={loading}
            onCreateClassroom={() =>
              history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, {
                classroomId,
              })
            }
            onCreateStudent={onStudentModalOpen}
          />
        }
        isLoading={loading}
        title={displayTitle}
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
      <FormProvider {...studentFormMethods}>
        <AddStudentModal
          classId={classroomId}
          isOpen={isStudentModalOpen}
          onClose={onStudentModalClose}
        />
      </FormProvider>
      <RouterTabs routes={TAB_CONFIG(onStudentModalOpen)} />
    </Flex>
  );
};

export default DisplayClassroomsPage;
