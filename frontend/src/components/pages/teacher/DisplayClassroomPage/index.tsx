import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Flex,
  HStack,
  IconButton,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { GET_CLASS_DETAILS_BY_ID } from "../../../../APIClients/queries/ClassQueries";
import type { ClassTitleData } from "../../../../APIClients/types/ClassClientTypes";
import type { Grade } from "../../../../APIClients/types/UserClientTypes";
import { ArchiveOutlineIcon, EditOutlineIcon } from "../../../../assets/icons";
import { classroomFormDefaultValues } from "../../../../constants/ClassroomConstants";
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
import usePageTitle from "../../../auth/usePageTitle";
import HeaderWithButton from "../../../common/HeaderWithButton";
import FormBreadcrumb from "../../../common/navigation/FormBreadcrumb";
import RouterTabs from "../../../common/navigation/RouterTabs";
import SimplePopover from "../../../common/popover/SimplePopover";
import AddOrEditStudentModal from "../../../teacher/student-management/AddOrEditStudentModal";
import AddOrEditClassroomModal from "../../../teacher/student-management/classroom-summary/AddOrEditClassroomModal";
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

const getLocationState = (
  state: unknown,
): {
  className?: string;
  startDate?: Date;
  gradeLevel?: Grade;
  isActive?: boolean;
} => ({
  className: undefined,
  startDate: undefined,
  gradeLevel: undefined,
  isActive: undefined,
  ...(typeof state === "object" ? state : {}),
});

const DisplayClassroomsPage = () => {
  const history = useHistory();
  const { classroomId } = useParams<{ classroomId: string }>();
  const { state } = useLocation();
  const { className, startDate, gradeLevel, isActive } =
    getLocationState(state);

  const { data } = useQuery<{ class: ClassTitleData }>(
    GET_CLASS_DETAILS_BY_ID,
    {
      variables: { classroomId },
      skip: !!className && !!startDate && !!gradeLevel && !!isActive,
    },
  );
  const displayTitle = data?.class.className ?? className;
  const displayStartDate = useMemo(
    () =>
      data?.class.startDate
        ? new Date(data.class.startDate)
        : startDate
        ? new Date(startDate)
        : startDate,
    [data?.class.startDate, startDate],
  );
  const displayGradeLevel = data?.class.gradeLevel ?? gradeLevel;
  const loading = !displayTitle;
  const isClassActive = data?.class.isActive ?? isActive;

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
    // We need to reset the form values in case we had to fetch the class data
    // from the server.
    classroomFormMethods.reset(
      {
        className: displayTitle || classroomFormDefaultValues.className,
        startDate: displayStartDate || classroomFormDefaultValues.startDate,
        gradeLevel: displayGradeLevel || classroomFormDefaultValues.gradeLevel,
      },
      { keepDefaultValues: false },
    );
  }, [classroomFormMethods, displayGradeLevel, displayStartDate, displayTitle]);

  usePageTitle(displayTitle ?? "Classroom");

  return (
    <Flex direction="column" flex="1" gap={3}>
      <FormBreadcrumb
        breadcrumbs={BREADCRUMB_CONFIG(displayTitle)}
        page={1}
        setPage={(newPage) => !newPage && history.push(Routes.CLASSROOMS_PAGE)}
      />
      {!isActive && (
        <HStack
          border="1px solid"
          borderColor="grey.200"
          borderRadius={8}
          my={2}
          p={4}
        >
          <ArchiveOutlineIcon />
          <Text color="grey.300" textStyle="paragraph">
            This class has been archived
          </Text>
        </HStack>
      )}
      <HeaderWithButton
        button={
          <SimplePopover
            isDisabled={loading}
            items={[
              {
                name: "Assessment",
                onClick: () =>
                  history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE, {
                    classroomId: classroomId,
                    classroomName: displayTitle,
                  }),
              },
              { name: "Student", onClick: onStudentModalOpen },
            ]}
            text="Add"
          />
        }
        isLoading={loading}
        showButton={isClassActive}
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
        {!loading && isClassActive && (
          <IconButton
            aria-label="Edit classroom"
            icon={<EditOutlineIcon />}
            onClick={onClassroomModalOpen}
            size="icon"
            variant="icon"
          />
        )}
      </HeaderWithButton>
      <FormProvider {...studentFormMethods}>
        <AddOrEditStudentModal
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
