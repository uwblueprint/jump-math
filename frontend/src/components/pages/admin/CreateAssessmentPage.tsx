import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Divider, VStack } from "@chakra-ui/react";

import { QuestionElement } from "../../../types/QuestionTypes";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";
import QuestionEditor from "../../question-creation/QuestionEditor";

const CreateAssessmentPage = (): React.ReactElement => {
  const { date } = useParams<{ date: string }>();
  const [validSubmit, setValidSubmit] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");

  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [questions, setQuestions] = useState<QuestionElement[][]>([]);

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
    <>
      {showQuestionEditor ? (
        <QuestionEditor
          setQuestions={setQuestions}
          setShowQuestionEditor={setShowQuestionEditor}
        />
      ) : (
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
            <AssessmentQuestions
              questions={questions}
              setShowQuestionEditor={setShowQuestionEditor}
            />
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default CreateAssessmentPage;
