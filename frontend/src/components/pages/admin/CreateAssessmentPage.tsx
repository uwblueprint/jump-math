import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Box, Divider } from "@chakra-ui/react";

import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";

const CreateAssessmentPage = (): React.ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const location = useLocation();
  const { date } = location.state as { date: string };
  const [validSubmit, setValidSubmit] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");

  const onSubmit = (data: any, e: any) => {
    setValidSubmit(true);
    console.log(data, e);
  };
  const onError = (errs: any, e: any) => {
    setValidSubmit(false);
  };

  const handleSave = handleSubmit(onSubmit, onError);

  return (
    <Box>
      <CreateAssessementHeader
        assessmentName={assessmentName}
        date={date}
        save={handleSave}
      />
      <BasicInformation
        control={control}
        errors={errors}
        register={register}
        setAssessmentName={setAssessmentName}
        validSubmit={validSubmit}
      />
      <Divider />
      <AssessmentQuestions />
    </Box>
  );
};

export default CreateAssessmentPage;
