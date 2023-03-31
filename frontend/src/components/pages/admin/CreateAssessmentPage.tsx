import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import { CREATE_NEW_ASSESSMENT } from "../../../APIClients/mutations/TestMutations";
import { TestRequest } from "../../../APIClients/types/TestClientTypes";
import { ASSESSMENTS_PAGE } from "../../../constants/Routes";
import { Status } from "../../../types/AssessmentTypes";
import { QuestionElement } from "../../../types/QuestionTypes";
import { formatQuestionsRequest } from "../../../utils/QuestionUtils";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";
import QuestionEditor from "../../question-creation/QuestionEditor";

const CreateAssessmentPage = (): React.ReactElement => {
  const history = useHistory();

  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<QuestionElement[][]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [createTest] = useMutation<{
    createTest: { createTest: { id: string } };
  }>(CREATE_NEW_ASSESSMENT);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<TestRequest>();

  const onSave: SubmitHandler<TestRequest> = async (data) => {
    const test: TestRequest = {
      ...data,
      status: Status.DRAFT,
      questions: formatQuestionsRequest(questions),
    };
    await createTest({ variables: { test } })
      .then(() => {
        history.push(ASSESSMENTS_PAGE);
      })
      .catch(() => {
        setErrorMessage("Assessment failed to save. Please try again.");
      });
  };
  const onError = () => {
    setErrorMessage("Please resolve all issues before publishing or saving");
  };

  const handleSave = handleSubmit(onSave, onError);

  return (
    <>
      {showQuestionEditor ? (
        <QuestionEditor
          setQuestions={setQuestions}
          setShowQuestionEditor={setShowQuestionEditor}
        />
      ) : (
        <VStack spacing="8" width="100%">
          <CreateAssessementHeader name={name} onSave={handleSave} />
          <VStack spacing="8" width="92%">
            <BasicInformation
              control={control}
              errorMessage={errorMessage}
              errors={errors}
              register={register}
              setName={setName}
              setValue={setValue}
              watch={watch}
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
