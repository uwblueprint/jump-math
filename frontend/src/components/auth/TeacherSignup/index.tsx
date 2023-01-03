/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useLazyQuery } from "@apollo/client";
import AuthContext from "../../../contexts/AuthContext";
import { TeacherSignupForm, TeacherSignupProps } from "./types";
import { AuthenticatedUser } from "../../../types/AuthTypes";
import { REGISTER_TEACHER } from "../../../APIClients/mutations/AuthMutations";
import authAPIClient from "../../../APIClients/AuthAPIClient";
import {
  ADD_TEACHER_TO_SCHOOL,
  CREATE_SCHOOL,
} from "../../../APIClients/mutations/SchoolMutations";
import { GET_SCHOOL } from "../../../APIClients/queries/SchoolQueries";
import { SchoolResponse } from "../../../APIClients/types/SchoolClientTypes";
import { UserResponse } from "../../../APIClients/types/UserClientTypes";

import TeacherSignupOne from "./steps/TeacherSignUpOne";
import TeacherSignupTwo from "./steps/TeacherSignupTwo";
import TeacherSignupThree from "./steps/TeacherSignupThree";
import TeacherSignupFour from "./steps/TeacherSignupFour";
import TeacherSignupFive from "./steps/TeacherSignupFive";
import NotFound from "../../pages/NotFound";
import TeacherWrapper from "../../common/TeacherWrapper";

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
    case 5:
      return <TeacherSignupFive />;
    default:
      return <NotFound />;
  }
};

const TeacherSignup = (): React.ReactElement => {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const methods = useForm<TeacherSignupForm>({
    defaultValues,
    mode: "onChange",
  });
  const [page, setPage] = React.useState(1);
  const [user, setUser] = React.useState<AuthenticatedUser>();

  const onSuccessfulSignup = () => {
    if (user) {
      setAuthenticatedUser(user);
      setPage(5);
    }
  };

  const [registerTeacher] = useMutation<{ register: AuthenticatedUser }>(
    REGISTER_TEACHER,
  );
  const [addTeacherToSchool] = useMutation<{
    addTeacherToSchool: SchoolResponse;
  }>(ADD_TEACHER_TO_SCHOOL, {
    onCompleted() {
      onSuccessfulSignup();
    },
  });
  const [getSchool] = useLazyQuery<{ school: SchoolResponse }>(GET_SCHOOL, {
    onCompleted: async (data: { school: SchoolResponse }) => {
      await addTeacherToSchool({
        variables: {
          school: {
            address: data.school.address,
            city: data.school.city,
            country: data.school.country,
            name: data.school.name,
            subRegion: data.school.subRegion,
            teachers: data.school.teachers?.map(
              (teacher: UserResponse) => teacher.id,
            ),
          },
          schoolId: data.school.id,
          teacherId: user?.id,
        },
      });
    },
  });
  const [createSchool] = useMutation<{ createSchool: SchoolResponse }>(
    CREATE_SCHOOL,
    {
      onCompleted() {
        onSuccessfulSignup();
      },
    },
  );

  const onSubmitSuccess = async (data: TeacherSignupForm) => {
    const newUser: AuthenticatedUser = await authAPIClient.register(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      registerTeacher,
    );
    if (newUser) {
      setUser(newUser);

      if (data.school.id) {
        await getSchool({ variables: { id: data.school.id } });
      } else {
        await createSchool({
          variables: {
            school: {
              name: data.school.name,
              country: data.school.country,
              subRegion: data.school.district,
              city: data.school.city,
              address: data.school.address,
              teachers: [newUser.id],
            },
          },
        });
      }
    }
  };

  const handleSubmitCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    methods.handleSubmit(onSubmitSuccess)(e);
  };

  return (
    <FormProvider {...methods}>
      <TeacherWrapper
        header={page === 5 ? "Teacher Sign Up Confirmation" : "Teacher Sign Up"}
        paddingTop={page === 5}
        component={renderPageComponent(page, {
          setPage,
          handleSubmitCallback,
        })}
      />
    </FormProvider>
  );
};

export default TeacherSignup;
