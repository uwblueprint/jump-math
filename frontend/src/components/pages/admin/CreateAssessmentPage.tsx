import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import { CREATE_NEW_ASSESSMENT } from "../../../APIClients/mutations/TestMutations";
import { TestRequest } from "../../../APIClients/types/TestClientTypes";
import { ASSESSMENTS_PAGE } from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { Status } from "../../../types/AssessmentTypes";
import { Question } from "../../../types/QuestionTypes";
import { formatQuestionsRequest } from "../../../utils/QuestionUtils";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import CreateAssessementHeader from "../../assessments/assessment-creation/CreateAssessmentHeader";
import QuestionEditor from "../../question-creation/QuestionEditor";

const CreateAssessmentPage = (): React.ReactElement => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editorQuestion, setEditorQuestion] = useState<Question | null>(null);
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
    clearErrors,
  } = useForm<TestRequest>();

  const noQuestionError =
    "Please add at least one question to the assessment before saving";
  useEffect(() => {
    if (errorMessage === noQuestionError && questions.length !== 0) {
      setErrorMessage("");
    }
  }, [questions, errorMessage]);

  const onCreateTest = async (test: TestRequest) => {
    if (questions.length === 0) {
      setErrorMessage(noQuestionError);
    } else {
      await createTest({
        variables: {
          test,
        },
      })
        .then(() => {
          history.push(ASSESSMENTS_PAGE);
        })
        .catch(() => {
          setErrorMessage("Assessment failed to save. Please try again.");
        });
    }
  };

  const onSave: SubmitHandler<TestRequest> = async (data) => {
    onCreateTest({
      ...data,
      status: Status.DRAFT,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onPublish: SubmitHandler<TestRequest> = async (data) => {
    onCreateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onError = () => {
    setErrorMessage("Please resolve all issues before publishing or saving");
  };

  const handleSave = handleSubmit(onSave, onError);
  const handlePublish = handleSubmit(onPublish, onError);

  return (
    <DndProvider backend={HTML5Backend}>
      <AssessmentContext.Provider
        value={{
          questions,
          setQuestions,
          showQuestionEditor,
          setShowQuestionEditor,
          editorQuestion,
          setEditorQuestion,
        }}
      >
        {showQuestionEditor ? (
          <QuestionEditor />
        ) : (
          <VStack spacing="8" width="100%">
            <CreateAssessementHeader
              name={name}
              onPublish={handlePublish}
              onSave={handleSave}
            />
            <VStack spacing="8" width="92%">
              <BasicInformation
                clearErrors={clearErrors}
                control={control}
                errorMessage={errorMessage}
                errors={errors}
                register={register}
                setName={setName}
                setValue={setValue}
                watch={watch}
              />
              <Divider borderColor="grey.200" />
              <AssessmentQuestions />
            </VStack>
          </VStack>
        )}
      </AssessmentContext.Provider>
    </DndProvider>
  );
};

export default CreateAssessmentPage;
