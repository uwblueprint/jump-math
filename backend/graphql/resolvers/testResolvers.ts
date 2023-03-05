import TestService from "../../services/implementations/testService";
import {
  AssessmentStatus,
  QuestionComponentMetadata,
  QuestionComponent,
} from "../../models/test.model";
import UserService from "../../services/implementations/userService";
import {
  ITestService,
  TestRequestDTO,
  TestResponseDTO,
  QuestionComponentRequest,
  QuestionComponentMetadataRequest,
} from "../../services/interfaces/testService";
import IUserService from "../../services/interfaces/userService";

const userService: IUserService = new UserService();
const testService: ITestService = new TestService(userService);

type QuestionMetadataName =
  | "QuestionTextMetadata"
  | "TextMetadata"
  | "ImageMetadata"
  | "MultipleChoiceMetadata"
  | "MultiSelectMetadata"
  | "ShortAnswerMetadata";

const resolveQuestions = (
  questions: QuestionComponentRequest[][],
): QuestionComponent[][] => {
  const resolvedQuestions: QuestionComponent[][] = [];

  questions.forEach((questionComponents: QuestionComponentRequest[]) => {
    const resolvedQuestionComponents: QuestionComponent[] = [];
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

    resolvedQuestions.push(resolvedQuestionComponents);
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
      const resolvedQuestions: QuestionComponent[][] = resolveQuestions(
        test.questions,
      );
      return testService.createTest({ ...test, questions: resolvedQuestions });
    },
    updateTest: async (
      _req: undefined,
      { id, test }: { id: string; test: TestRequestDTO },
    ): Promise<TestResponseDTO | null> => {
      const resolvedQuestions: QuestionComponent[][] = resolveQuestions(
        test.questions,
      );
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

    publishTest: async (
      _req: undefined,
      { test_id }: { test_id: string },
    ): Promise<TestResponseDTO | null> => {
      const testToUpdate = await testService.getTestById(test_id);
      if (!testToUpdate) {
        throw new Error(`Test with id ${test_id} does not exist.`);
      }
      if (testToUpdate.status !== AssessmentStatus.DRAFT) {
        throw new Error(`Test with id ${test_id} cannot be published.`);
      }
      const updatedTest = await testService.updateTest(test_id, {
        ...testToUpdate,
        status: AssessmentStatus.PUBLISHED,
        admin: testToUpdate.admin.id,
      });
      return updatedTest;
    },
  },
};

export default testResolvers;
