import TestService from "../../services/implementations/testService";
import UserService from "../../services/implementations/userService";
import {
  ITestService,
  TestRequestDTO,
  TestResponseDTO,
  QuestionRequest,
} from "../../services/interfaces/testService";
import IUserService from "../../services/interfaces/userService";

import {
  MultipleChoiceMetadata,
  NumericQuestionMetadata,
  Question,
  QuestionMetadata,
} from "../../models/test.model";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService(userService);

type QuestionMetadataName =
  | "MultipleChoiceMetadata"
  | "NumericQuestionMetadata";

const resolveQuestions = (questions: QuestionRequest[]): Question[] => {
  const resolvedQuestions: Question[] = [];

  questions.forEach((question: QuestionRequest) => {
    const multipleChoiceMetadata: MultipleChoiceMetadata =
      question.questionMetadataMultipleChoice;
    const numericQuestionMetadata: NumericQuestionMetadata =
      question.questionMetadataNumericQuestion;
    const questionMetadata =
      question.questionType.toString() === "MULTIPLE_CHOICE"
        ? multipleChoiceMetadata
        : numericQuestionMetadata;

    resolvedQuestions.push({
      questionType: question.questionType,
      questionPrompt: question.questionPrompt,
      questionMetadata,
    });
  });

  return resolvedQuestions;
};

const testResolvers = {
  QuestionMetadata: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType: (obj: QuestionMetadata): QuestionMetadataName | null => {
      if ("options" in obj) return "MultipleChoiceMetadata";
      if ("answer" in obj) return "NumericQuestionMetadata";
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
