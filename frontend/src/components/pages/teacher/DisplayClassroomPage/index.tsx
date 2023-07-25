import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Flex, IconButton, Tag, useDisclosure } from "@chakra-ui/react";

import { GET_CLASS_DETAILS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { ClassTitleData } from "../../../../APIClients/types/ClassClientTypes";
import type { Grade } from "../../../../APIClients/types/UserClientTypes";
import { EditOutlineIcon } from "../../../../assets/icons";
import * as Routes from "../../../../constants/Routes";
import type {
  ClassroomForm,
  StudentForm,
} from "../../../../types/ClassroomTypes";
import {
  formatMonth,
  removeUnderscore,
  titleCase,
} from "../../../../utils/GeneralUtils";
import RedirectTo from "../../../auth/RedirectTo";
import HeaderWithButton from "../../../common/HeaderWithButton";
import FormBreadcrumb from "../../../common/navigation/FormBreadcrumb";
import RouterTabs from "../../../common/navigation/RouterTabs";
import AddStudentModal from "../../../teacher/student-management/AddStudentModal";
import AddOrEditClassroomModal from "../../../teacher/student-management/classroom-summary/AddOrEditClassroomModal";
import AddClassroomOrStudentPopover from "../../../teacher/student-management/view-students/AddClassroomOrStudentPopover";
import NotFound from "../../NotFound";

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

const studentFormDefaultValues: StudentForm = {
  firstName: "",
  lastName: "",
  studentNumber: undefined,
};

const classroomFormDefaultValues: ClassroomForm = {
  className: "",
  startDate: undefined,
  gradeLevel: undefined,
};

const getLocationState = (
  state: unknown,
): { className?: string; startDate?: Date; gradeLevel?: Grade } => {
  const result = {
    className: undefined,
    startDate: undefined,
    gradeLevel: undefined,
    ...(typeof state === "object" ? state : {}),
  };
  return {
    ...result,
    startDate: result.startDate ? new Date(result.startDate) : undefined,
  };
};

const DisplayClassroomsPage = () => {
  const history = useHistory();
  const { classroomId } = useParams<{ classroomId: string }>();
  const { state } = useLocation();
  const { className, startDate, gradeLevel } = getLocationState(state);

  const { data } = useQuery<{ class: ClassTitleData }>(
    GET_CLASS_DETAILS_BY_ID,
    {
      variables: { classroomId },
      skip: !!className,
    },
  );
  const displayTitle = data?.class.className ?? className;
  const displayStartDate = useMemo(
    () => (data?.class.startDate ? new Date(data.class.startDate) : startDate),
    [data?.class.startDate, startDate],
  );
  const displayGradeLevel = data?.class.gradeLevel ?? gradeLevel;
  const loading = !displayTitle;

  const {
    isOpen: isStudentModalOpen,
    onClose: onStudentModalClose,
    onOpen: onStudentModalOpen,
  } = useDisclosure();
  const studentFormMethods = useForm<StudentForm>({
    defaultValues: studentFormDefaultValues,
    mode: "onChange",
  });

  const {
    isOpen: isClassroomModalOpen,
    onClose: onClassroomModalClose,
    onOpen: onClassroomModalOpen,
  } = useDisclosure();
  const classroomFormMethods = useForm<ClassroomForm>({
    defaultValues: classroomFormDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    classroomFormMethods.reset(
      {
        className: displayTitle,
        startDate: displayStartDate,
        gradeLevel: displayGradeLevel,
      },
      { keepDefaultValues: false },
    );
  }, [classroomFormMethods, displayGradeLevel, displayStartDate, displayTitle]);

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
        {displayStartDate && (
          <Tag bg="blue.50" color="blue.300" size="lg">
            {formatMonth(displayStartDate)}
          </Tag>
        )}
        {displayGradeLevel && (
          <Tag bg="green.50" color="green.400" size="lg">
            {titleCase(removeUnderscore(displayGradeLevel))}
          </Tag>
        )}
        {!loading && (
          <IconButton
            aria-label="edit-classroom"
            icon={<EditOutlineIcon />}
            onClick={() => {
              classroomFormMethods.reset();
              onClassroomModalOpen();
            }}
            size="icon"
            variant="icon"
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
      <FormProvider {...classroomFormMethods}>
        <AddOrEditClassroomModal
          classroomId={classroomId}
          isOpen={isClassroomModalOpen}
          onClose={onClassroomModalClose}
        />
      </FormProvider>
      <RouterTabs routes={TAB_CONFIG(onStudentModalOpen)} />
    </Flex>
  );
};

export default DisplayClassroomsPage;
