import TestService from "../../services/implementations/testService";
import {
  AssessmentStatus,
  QuestionComponentMetadata,
  QuestionComponent,
} from "../../models/test.model";
import {
  ITestService,
  TestRequestDTO,
  TestResponseDTO,
  QuestionComponentRequest,
  QuestionComponentMetadataRequest,
} from "../../services/interfaces/testService";

const testService: ITestService = new TestService();

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
    tests: async (
      _: unknown,
      { status }: { status?: AssessmentStatus[] },
    ): Promise<TestResponseDTO[]> => {
      return testService.getAllTests(status);
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
      { id }: { id: string },
    ): Promise<TestResponseDTO | null> => {
      const testToUpdate = await testService.getTestById(id);
      if (testToUpdate.status !== AssessmentStatus.DRAFT) {
        throw new Error(`Test with id ${id} cannot be published.`);
      }
      const updatedTest = await testService.updateTest(id, {
        ...testToUpdate,
        status: AssessmentStatus.PUBLISHED,
      });
      return updatedTest;
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
      const testToUpdate = await testService.getTestById(id);
      if (
        testToUpdate.status !== AssessmentStatus.DRAFT &&
        testToUpdate.status !== AssessmentStatus.PUBLISHED
      ) {
        throw new Error(`Test with id ${id} cannot be archived.`);
      }
      const updatedTest = await testService.updateTest(id, {
        ...testToUpdate,
        status: AssessmentStatus.ARCHIVED,
      });
      return updatedTest;
    },
  },
};

export default testResolvers;
