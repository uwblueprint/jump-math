import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import { SAVE_ASSESSMENT } from "../../../APIClients/mutations/TestMutations";
import { ASSESSMENTS } from "../../../constants/Routes";
import {
  AssessmentData,
  Status,
  TestRequest,
} from "../../../types/AssessmentTypes";
import { QuestionElement } from "../../../types/QuestionTypes";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";
import QuestionEditor from "../../question-creation/QuestionEditor";

const CreateAssessmentPage = (): React.ReactElement => {
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [questions, setQuestions] = useState<QuestionElement[][]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<AssessmentData>();

  const location = useLocation();
  const history = useHistory();
  const { date } = location.state as { date: string };
  const [validSubmit, setValidSubmit] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");
  const [createTest] = useMutation<{
    createTest: { createTest: { id: string } };
  }>(SAVE_ASSESSMENT);

  const onSubmit: SubmitHandler<AssessmentData> = async (data) => {
    setValidSubmit(true);
    const test: TestRequest = {
      name: data.assessmentName,
      questions: [],
      grade: data.grade.value,
      assessmentType: data.type,
      status: Status.DRAFT,
      curriculumCountry: data.country.value,
      curriculumRegion: data.region,
    };
    await createTest({ variables: { test } })
      .then((response) => {
        console.log("response data: ", response);
        history.push(ASSESSMENTS);
      })
      .catch(() => {
        console.log("error");
      });
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
