/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useLazyQuery } from "@apollo/client";
import { HOME_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import TeacherSignupOne from "./TeacherSignUpOne";
import { TeacherSignupForm, TeacherSignupProps } from "./types";
import TeacherSignupFour from "./TeacherSignupFour";
import TeacherSignupThree from "./TeacherSignupThree";
import TeacherSignupTwo from "./TeacherSignupTwo";
import { AuthenticatedUser } from "../../../types/AuthTypes";
import { REGISTER_TEACHER } from "../../../APIClients/mutations/AuthMutations";
import authAPIClient from "../../../APIClients/AuthAPIClient";
import {
  ADD_TEACHER_TO_SCHOOL,
  CREATE_SCHOOL,
} from "../../../APIClients/mutations/SchoolMutations";
import { GET_SCHOOL } from "../../../APIClients/queries/SchoolQueries";
import {
  SchoolRequest,
  SchoolResponse,
} from "../../../APIClients/types/SchoolClientTypes";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  grades: [],
  currentlyTeachingJM: null,
  school: {
    name: "",
    id: "",
    country: "",
    city: "",
    district: "",
    address: "",
  },
  password: "",
} as TeacherSignupForm;

const renderPageComponent = (
  page: number,
  teacherSignupProps: TeacherSignupProps,
) => {
  switch (page) {
    case 1:
      return <TeacherSignupOne {...teacherSignupProps} />;
    case 2:
      return <TeacherSignupTwo {...teacherSignupProps} />;
    case 3:
      return <TeacherSignupThree {...teacherSignupProps} />;
    case 4:
      return <TeacherSignupFour {...teacherSignupProps} />;
    default:
      return <></>;
  }
};
const TeacherSignup = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const methods = useForm<TeacherSignupForm>({
    defaultValues,
    mode: "onChange",
  });
  const [page, setPage] = React.useState(1);
  const [getSchool, schoolRes] = useLazyQuery<SchoolResponse>(GET_SCHOOL);
  const [registerTeacher] = useMutation<{ register: AuthenticatedUser }>(
    REGISTER_TEACHER,
  );
  const [createSchool] = useMutation<{ createSchool: SchoolResponse }>(
    CREATE_SCHOOL,
  );
  const [addTeacherToSchool] = useMutation<{
    addTeacherToSchool: SchoolResponse;
  }>(ADD_TEACHER_TO_SCHOOL);

  const onSubmitSuccess = async (data: TeacherSignupForm) => {
    console.log("Data being submitted: ", data);
    const user: AuthenticatedUser = await authAPIClient.register(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      registerTeacher,
    );
    if (data.school.id) {
      getSchool({ variables: { id: data.school.id } });
      if (schoolRes.data) {
        const { id, ...schoolObj }: SchoolResponse = schoolRes.data;
        const schoolReq: SchoolRequest = {
          ...schoolObj,
          teachers: schoolObj.teachers.map((teacher) => teacher.id),
        };
        await addTeacherToSchool({
          variables: { school: schoolReq, schoolId: id, teacherId: user?.id },
        });
      }
    } else {
      await createSchool({
        variables: {
          school: {
            name: data.school.name,
            country: data.school.country,
            subRegion: data.school.district,
            city: data.school.city,
            address: data.school.address,
            teachers: [user?.id],
          },
        },
      });
    }
    setAuthenticatedUser(user);
  };

  const onSubmitFailure = (err: any) => {
    console.log("Errors: ", err);
  };

  const handleSubmitCallback = () => {
    console.log("Submitting");
    methods.handleSubmit(onSubmitSuccess, onSubmitFailure);
  };

  if (authenticatedUser) return <Redirect to={HOME_PAGE} />;

  return (
    <FormProvider {...methods}>
      <HStack>
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png"
          alt="Teacher-Signup"
          fit="cover"
          width="50%"
          height="100vh"
        />
        <VStack width="50%" height="100vh" padding={6}>
          <Image
            src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump_math_logo_short_ver.png"
            alt="Jump-Math-Logo"
            py={5}
          />
          <Text textStyle="header4" textAlign="center" pb={4}>
            Teacher Sign Up
          </Text>
          {renderPageComponent(page, {
            setPage,
            handleSubmitCallback,
          })}
        </VStack>
      </HStack>
    </FormProvider>
  );
};

export default TeacherSignup;
