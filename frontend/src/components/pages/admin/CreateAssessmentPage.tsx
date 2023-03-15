import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Divider, VStack } from "@chakra-ui/react";

import TEST_QUESTIONS from "../../../constants/TestConstants";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";

const CreateAssessmentPage = (): React.ReactElement => {
  const location = useLocation();
  const { date } = location.state as { date: string };
  const [validSubmit, setValidSubmit] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data: any, e: any) => {
    setValidSubmit(true);
    console.log(data, e);
  };
  const onError = (errs: any, e: any) => {
    setValidSubmit(false);
  };

  const handleSave = handleSubmit(onSubmit, onError);

  return (
    <VStack spacing="8" width="100%">
      <CreateAssessementHeader
        assessmentName={assessmentName}
        date={date}
        save={handleSave}
      />
      <VStack spacing="8" width="92%">
        <BasicInformation
          control={control}
          errors={errors}
          register={register}
          setAssessmentName={setAssessmentName}
          validSubmit={validSubmit}
        />
        <Divider borderColor="grey.200" />
        <AssessmentQuestions questions={TEST_QUESTIONS} />
      </VStack>
    </VStack>
  );
};

export default CreateAssessmentPage;
