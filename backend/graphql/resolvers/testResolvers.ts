import TestService from "../../services/implementations/testService";
import UserService from "../../services/implementations/userService";
import {
  ITestService,
  TestRequestDTO,
  TestResponseDTO,
  QuestionRequest,
  QuestionComponentRequest,
  QuestionComponentMetadataRequest,
} from "../../services/interfaces/testService";
import IUserService from "../../services/interfaces/userService";

import {
  Question,
  QuestionComponentMetadata,
  QuestionComponent,
} from "../../models/test.model";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService(userService);

type QuestionMetadataName =
  | "QuestionTextMetadata"
  | "TextMetadata"
  | "ImageMetadata"
  | "MultipleChoiceMetadata"
  | "MultiSelectMetadata"
  | "ShortAnswerMetadata";

const resolveQuestions = (questions: QuestionRequest[]): Question[] => {
  const resolvedQuestions: Question[] = [];

  questions.forEach((question: QuestionRequest) => {
    const resolvedQuestionComponents: QuestionComponent[] = [];

    const questionComponents: QuestionComponentRequest[] = question.question;
    questionComponents.forEach(
      (questionComponent: QuestionComponentRequest) => {
        const {
          questionTextMetadata,
          textMetadata,
          imageMetadata,
          multipleChoiceMetadata,
          multiSelectMetadata,
          shortAnswerMetadata,
        }: QuestionComponentMetadataRequest = questionComponent;

        let metadata: QuestionComponentMetadata;

        switch (questionComponent.type.toString()) {
          case "QUESTION_TEXT":
            metadata = questionTextMetadata;
            break;
          case "TEXT":
            metadata = textMetadata;
            break;
          case "IMAGE":
            metadata = imageMetadata;
            break;
          case "MULTIPLE_CHOICE":
            metadata = multipleChoiceMetadata;
            break;
          case "MULTI_SELECT":
            metadata = multiSelectMetadata;
            break;
          case "SHORT_ANSWER":
            metadata = shortAnswerMetadata;
            break;
          default:
            metadata = questionTextMetadata; // placeholder
            break;
        }

        resolvedQuestionComponents.push({
          type: questionComponent.type,
          metadata,
        });
      },
    );

    resolvedQuestions.push({
      question: resolvedQuestionComponents,
    });
  });

  return resolvedQuestions;
};

const testResolvers = {
  QuestionComponentMetadata: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType: (
      obj: QuestionComponentMetadata,
    ): QuestionMetadataName | null => {
      if ("questionText" in obj) return "QuestionTextMetadata";
      if ("text" in obj) return "TextMetadata";
      if ("src" in obj) return "ImageMetadata";
      if ("answerIndex" in obj) return "MultipleChoiceMetadata";
      if ("answerIndices" in obj) return "MultiSelectMetadata";
      if ("answer" in obj) return "ShortAnswerMetadata";

      return null;
    },
  },
  Query: {
    tests: async (): Promise<TestResponseDTO[]> => {
      return testService.getAllTests();
    },
  },
  Mutation: {
    createTest: async (
      _req: undefined,
      { test }: { test: TestRequestDTO },
    ): Promise<TestResponseDTO> => {
      const resolvedQuestions: Question[] = resolveQuestions(test.questions);
      return testService.createTest({ ...test, questions: resolvedQuestions });
    },
    updateTest: async (
      _req: undefined,
      { id, test }: { id: string; test: TestRequestDTO },
    ): Promise<TestResponseDTO | null> => {
      const resolvedQuestions: Question[] = resolveQuestions(test.questions);
      return testService.updateTest(id, {
        ...test,
        questions: resolvedQuestions,
      });
    },
    deleteTestById: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return testService.deleteTest(id);
    },
  },
};

export default testResolvers;
