import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Grade } from "../../../APIClients/types/UserClientTypes";
import { ClassroomForm } from "../../../types/ClassroomTypes";
import Logout from "../../auth/Logout";
import RefreshCredentials from "../../auth/RefreshCredentials";
import AddClassroomModal from "../../user-management/student/AddClassroomModal";
import AddStudentModal from "../../user-management/student/AddStudentModal";

const defaultValues = {
  className: "",
  schoolYear: "",
  gradeLevel: Grade.K,
} as ClassroomForm;

const TeacherPage = (): React.ReactElement => {
  const methods = useForm<ClassroomForm>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div style={{ textAlign: "center", margin: "0px auto" }}>
        <h1>Teacher Page</h1>
        <div className="btn-group">
          <Logout />
          <RefreshCredentials />
          <AddClassroomModal />
          <AddStudentModal />
        </div>
      </div>
    </FormProvider>
  );
};

export default TeacherPage;
