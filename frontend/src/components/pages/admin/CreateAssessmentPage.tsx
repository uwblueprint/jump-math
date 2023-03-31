import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import { CREATE_NEW_ASSESSMENT } from "../../../APIClients/mutations/TestMutations";
import {
  QuestionComponentRequest,
  TestRequest,
} from "../../../APIClients/types/TestClientTypes";
import { ASSESSMENTS_PAGE } from "../../../constants/Routes";
import { Status } from "../../../types/AssessmentTypes";
import {
  MultipleChoiceData,
  MultipleChoiceMetadata,
  QuestionElement,
  QuestionElementType,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../../types/QuestionTypes";
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

  const multipleChoiceToRequest = (
    data: MultipleChoiceData,
  ): MultipleChoiceMetadata => {
    return {
      options: data.options.map((option) => option.value),
      answerIndex: data.options.findIndex((option) => option.isCorrect),
    };
  };

  const questionsToRequest = (): QuestionComponentRequest[][] => {
    return questions.map((question) => {
      return question.map((element) => {
        switch (element.type) {
          case QuestionElementType.QUESTION_TEXT:
            return {
              type: QuestionElementType.QUESTION_TEXT,
              questionTextMetadata: element.data as QuestionTextMetadata,
              multipleChoiceMetadata: null,
            };
          case QuestionElementType.TEXT:
            return {
              type: QuestionElementType.TEXT,
              textMetadata: element.data as TextMetadata,
              multipleChoiceMetadata: null,
            };
          case QuestionElementType.SHORT_ANSWER:
            return {
              type: QuestionElementType.SHORT_ANSWER,
              shortAnswerMetadata: element.data as ShortAnswerMetadata,
              multipleChoiceMetadata: null,
            };
          case QuestionElementType.MULTIPLE_CHOICE:
            return {
              type: QuestionElementType.MULTIPLE_CHOICE,
              multipleChoiceMetadata: multipleChoiceToRequest(
                element.data as MultipleChoiceData,
              ),
            };
          default:
            return {
              type: QuestionElementType.QUESTION_TEXT,
              questionTextMetadata: element.data as QuestionTextMetadata,
              multipleChoiceMetadata: null,
            };
        }
      });
    });
  };

  const onSave: SubmitHandler<TestRequest> = async (data) => {
    const test: TestRequest = {
      ...data,
      status: Status.DRAFT,
      questions: questionsToRequest(),
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
