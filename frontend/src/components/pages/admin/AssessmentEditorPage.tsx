import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import {
  CREATE_NEW_TEST,
  UPDATE_TEST,
} from "../../../APIClients/mutations/TestMutations";
import { Test, TestRequest } from "../../../APIClients/types/TestClientTypes";
import { ASSESSMENTS_PAGE } from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { Status } from "../../../types/AssessmentTypes";
import { Question } from "../../../types/QuestionTypes";
import { formatQuestionsRequest } from "../../../utils/QuestionUtils";
import AssessmentEditorHeader from "../../assessments/assessment-creation/AssessmentEditorHeader";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import QuestionEditor from "../../question-creation/QuestionEditor";

const AssessmentEditorPage = (): React.ReactElement => {
  const { state } = useLocation<Test>();
  const history = useHistory();

  const [questions, setQuestions] = useState<Question[]>(
    state?.questions || [],
  );
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editorQuestion, setEditorQuestion] = useState<Question | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [createTest] = useMutation<{
    createTest: { createTest: { id: string } };
  }>(CREATE_NEW_TEST);

  const [updateTest] = useMutation<{
    updateTest: { updateTest: { id: string } };
  }>(UPDATE_TEST);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
    clearErrors,
  } = useForm<TestRequest>({
    defaultValues: {
      name: state?.name,
      questions: state?.questions,
      grade: state?.grade,
      assessmentType: state?.assessmentType,
      status: state?.status,
      curriculumCountry: state?.curriculumCountry,
      curriculumRegion: state?.curriculumRegion,
    },
  });

  const noQuestionError =
    "Please add at least one question to the assessment before saving";
  useEffect(() => {
    if (errorMessage === noQuestionError && questions.length !== 0) {
      setErrorMessage("");
    }
  }, [questions, errorMessage]);

  const validateForm = () => {
    if (questions.length === 0) {
      setErrorMessage(noQuestionError);
      return false;
    }
    return true;
  };

  const onCreateTest = async (test: TestRequest) => {
    if (validateForm()) {
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

  const onUpdateTest = async (test: TestRequest) => {
    if (validateForm() && state?.id) {
      await updateTest({
        variables: {
          id: state.id,
          test,
        },
      })
        .then(() => {
          history.push(ASSESSMENTS_PAGE);
        })
        .catch(() => {
          setErrorMessage("Assessment failed to update. Please try again.");
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

  const onPublish: SubmitHandler<TestRequest> = async (data: TestRequest) => {
    onCreateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onSaveChanges: SubmitHandler<TestRequest> = async (
    data: TestRequest,
  ) => {
    onUpdateTest({
      ...data,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onPublishChanges: SubmitHandler<TestRequest> = async (
    data: TestRequest,
  ) => {
    onUpdateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onError = () => {
    setErrorMessage("Please resolve all issues before publishing or saving");
  };

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
            <AssessmentEditorHeader
              handleSubmit={handleSubmit}
              isEditing={!!state}
              name={watch("name")}
              onConfirmPublish={state ? onPublishChanges : onPublish}
              onError={onError}
              onSave={state ? onSaveChanges : onSave}
              validateForm={validateForm}
            />
            <VStack spacing="8" width="92%">
              <BasicInformation
                clearErrors={clearErrors}
                control={control}
                errorMessage={errorMessage}
                errors={errors}
                register={register}
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

export default AssessmentEditorPage;