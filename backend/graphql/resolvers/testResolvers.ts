import TestService from "../../services/implementations/testService";
import type {
  GraphQLTestDTO,
  ITestService,
  TestResponseDTO,
} from "../../services/interfaces/testService";
import type {
  GraphQLQuestionComponentMetadata,
  QuestionComponentMetadata,
  QuestionComponentMetadataRequest,
} from "../../types/questionMetadataTypes";
import type {
  GraphQLQuestionComponent,
  QuestionComponentRequest,
} from "../../types/questionTypes";

const testService: ITestService = new TestService();

type QuestionMetadataName =
  | "QuestionTextMetadata"
  | "TextMetadata"
  | "ImageMetadata"
  | "MultipleChoiceMetadata"
  | "MultiSelectMetadata"
  | "ShortAnswerMetadata"
  | "FractionMetadata";

const resolveQuestions = (
  questions: GraphQLQuestionComponent[][],
): QuestionComponentRequest[][] => {
  const resolvedQuestions: QuestionComponentRequest[][] = [];

  questions.forEach((questionComponents: GraphQLQuestionComponent[]) => {
    const resolvedQuestionComponents: QuestionComponentRequest[] = [];
    questionComponents.forEach(
      (questionComponent: GraphQLQuestionComponent) => {
        const {
          questionTextMetadata,
          textMetadata,
          imageMetadataRequest,
          multipleChoiceMetadata,
          multiSelectMetadata,
          shortAnswerMetadata,
          fractionMetadata,
        }: GraphQLQuestionComponentMetadata = questionComponent;

        let metadata: QuestionComponentMetadataRequest;

        switch (questionComponent.type.toString()) {
          case "QUESTION_TEXT":
            metadata = questionTextMetadata;
            break;
          case "TEXT":
            metadata = textMetadata;
            break;
          case "IMAGE":
            metadata = imageMetadataRequest;
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
          case "FRACTION":
            metadata = fractionMetadata;
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
      if ("url" in obj) return "ImageMetadata";
      if ("answerIndex" in obj) return "MultipleChoiceMetadata";
      if ("answerIndices" in obj) return "MultiSelectMetadata";
      if ("answer" in obj) return "ShortAnswerMetadata";
      if ("numerator" in obj) return "FractionMetadata";

      return null;
    },
  },
  Query: {
    test: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<TestResponseDTO> => {
      return testService.getTestById(id);
    },
    tests: async (): Promise<TestResponseDTO[]> => {
      return testService.getAllTests();
    },
    publishedTests: async (): Promise<TestResponseDTO[]> => {
      return testService.getPublishedTests();
    },
  },
  Mutation: {
    createTest: async (
      _req: undefined,
      { test }: { test: GraphQLTestDTO },
    ): Promise<TestResponseDTO> => {
      const resolvedQuestions: QuestionComponentRequest[][] = resolveQuestions(
        test.questions,
      );
      return testService.createTest({ ...test, questions: resolvedQuestions });
    },
    updateTest: async (
      _req: undefined,
      { id, test }: { id: string; test: GraphQLTestDTO },
    ): Promise<TestResponseDTO | null> => {
      const resolvedQuestions: QuestionComponentRequest[][] = resolveQuestions(
        test.questions,
      );
      return testService.updateTest(id, {
        ...test,
        questions: resolvedQuestions,
      });
    },
    deleteTest: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return testService.deleteTest(id);
    },
    publishTest: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<TestResponseDTO | null> => {
      return testService.publishTest(id);
    },
    duplicateTest: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<TestResponseDTO | null> => {
      return testService.duplicateTest(id);
    },
    unarchiveTest: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<TestResponseDTO | null> => {
      return testService.unarchiveTest(id);
    },
    archiveTest: async (
      _req: undefined,
      { id }: { id: string },
    ): Promise<TestResponseDTO | null> => {
      return testService.archiveTest(id);
    },
  },
};

export default testResolvers;
