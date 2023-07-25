import type { TestSession } from "../../models/testSession.model";
import MgTestSession from "../../models/testSession.model";
import type { Class } from "../../models/class.model";
import MgClass from "../../models/class.model";
import type {
  ITestSessionService,
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import type { ITestService, TestResponseDTO } from "../interfaces/testService";
import type IUserService from "../interfaces/userService";
import type { ISchoolService } from "../interfaces/schoolService";
import type { QuestionComponent } from "../../types/questionTypes";
import { QuestionComponentType } from "../../types/questionTypes";
import type {
  MultipleChoiceMetadata,
  ShortAnswerMetadata,
  MultiSelectMetadata,
  FractionMetadata,
} from "../../types/questionMetadataTypes";
import {
  equalArrays,
  generateAccessCode,
  mapDocumentsToDTOs,
  mapDocumentToDTO,
  roundTwoDecimals,
} from "../../utilities/generalUtils";
import calculateMarkDistribution from "../../utilities/dataVisualizationUtils";

const Logger = logger(__filename);

class TestSessionService implements ITestSessionService {
  testService: ITestService;

  userService: IUserService;

  schoolService: ISchoolService;

  constructor(
    testService: ITestService,
    userService: IUserService,
    schoolService: ISchoolService,
  ) {
    this.testService = testService;
    this.userService = userService;
    this.schoolService = schoolService;
  }

  /* eslint-disable class-methods-use-this */
  async createTestSession(
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO> {
    try {
      const currentDate = new Date();

      if (
        testSession.startDate > testSession.endDate ||
        currentDate > testSession.endDate
      ) {
        throw new Error(`Test session start and end dates are not valid`);
      }

      const newTestSession = await MgTestSession.create({
        ...testSession,
        accessCode: generateAccessCode(),
        results: [],
      });
      await this.addTestSessionToClass(testSession.class, newTestSession.id);

      return mapDocumentToDTO(newTestSession);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create test session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getTestSessionById(id: string): Promise<TestSessionResponseDTO> {
    let testSession: TestSession | null;
    try {
      testSession = await MgTestSession.findById(id);
      if (!testSession) {
        throw new Error(`Test Session id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to get Test Session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return mapDocumentToDTO(testSession);
  }

  async getTestSessionByAccessCode(
    accessCode: string,
  ): Promise<TestSessionResponseDTO> {
    const currentDate = new Date();
    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        accessCode: { $eq: accessCode },
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      });

      if (!testSessions.length) {
        throw new Error(
          `Valid Test Session with access code ${accessCode} not found`,
        );
      } else if (testSessions.length > 1) {
        throw new Error(
          `More than one valid Test Session uses the access code ${accessCode}`,
        );
      }

      return mapDocumentToDTO(testSessions[0]);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get Test Session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async deleteTestSession(id: string): Promise<string> {
    try {
      const deletedTestSession = await MgTestSession.findByIdAndDelete(id);
      if (!deletedTestSession) {
        throw new Error(`Test Session id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getAllTestSessions(): Promise<Array<TestSessionResponseDTO>> {
    try {
      const testSessions: Array<TestSession> = await MgTestSession.find();
      return mapDocumentsToDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getTestSessionsBySchoolId(
    schoolId: string,
  ): Promise<TestSessionResponseDTO[]> {
    try {
      const testSessions: TestSession[] = await MgTestSession.find({
        school: { $eq: schoolId },
      });

      return mapDocumentsToDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getTestSessionsByTeacherId(
    teacherId: string,
    limit?: number,
  ): Promise<Array<TestSessionResponseDTO>> {
    try {
      const query = MgTestSession.find({ teacher: { $eq: teacherId } });
      if (limit !== undefined) {
        query.limit(limit);
      }
      const testSessions: TestSession[] = await query;

      return mapDocumentsToDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions for teacherId=${teacherId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getTestSessionsByClassId(
    classId: string,
  ): Promise<Array<TestSessionResponseDTO>> {
    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        class: { $eq: classId },
      });

      return mapDocumentsToDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions for classId=${classId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getTestSessionsByTestId(
    testId: string,
  ): Promise<Array<TestSessionResponseDTO>> {
    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        test: { $eq: testId },
      });

      return mapDocumentsToDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions by testId=${testId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getMarkDistribution(id: string): Promise<Array<number>> {
    try {
      const { results } = await this.getTestSessionById(id);

      if (!results?.length) {
        throw new Error(
          `There are no results for the test session with id ${id}`,
        );
      }

      return calculateMarkDistribution(results);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get mark distribution for the test session with id ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getPerformanceByQuestion(id: string): Promise<Array<number>> {
    const breakdownsByQuestion: Array<Array<boolean>> = [];
    const performanceByQuestion: Array<number> = [];

    try {
      const { results } = await this.getTestSessionById(id);

      if (!results?.length) {
        throw new Error(
          `There are no results for the test session with id ${id}`,
        );
      }

      results.forEach((result: ResultResponseDTO) => {
        result.breakdown.forEach((breakdown: boolean[], idx: number) => {
          if (breakdownsByQuestion[idx]) {
            breakdownsByQuestion[idx].push(...breakdown);
          } else {
            breakdownsByQuestion[idx] = breakdown;
          }
        });
      });

      breakdownsByQuestion.forEach((breakdown: boolean[], idx: number) => {
        const correctCount: number = breakdown.reduce(
          (count, val) => count + +val,
          0,
        );
        performanceByQuestion[idx] = (correctCount * 100) / breakdown.length;
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get performance by question for the test session with id ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return performanceByQuestion;
  }

  async updateTestSession(
    id: string,
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO> {
    let updatedTestSession: TestSession | null;

    try {
      updatedTestSession = await MgTestSession.findByIdAndUpdate(
        id,
        testSession,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedTestSession) {
        throw new Error(`Test Session id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update test session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return mapDocumentToDTO(updatedTestSession);
  }

  async createTestSessionResult(
    id: string,
    result: ResultRequestDTO,
  ): Promise<TestSessionResponseDTO> {
    let updatedTestSession: TestSession | null;
    try {
      const gradedResult: ResultResponseDTO = await this.gradeTestResult(
        result,
        id,
      );

      updatedTestSession = await MgTestSession.findByIdAndUpdate(
        id,
        {
          $push: { results: gradedResult },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedTestSession) {
        throw new Error(`Test Session id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update test session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return mapDocumentToDTO(updatedTestSession);
  }

  /*
   * gradeTestResult takes in a ResultRequestDTO and returns the corresponding graded ResultResponseDTO
   */
  async gradeTestResult(
    result: ResultRequestDTO,
    testSessionId: string,
  ): Promise<ResultResponseDTO> {
    let newResult: ResultResponseDTO;

    try {
      const testSession: TestSessionResponseDTO = await this.getTestSessionById(
        testSessionId,
      );
      newResult = await this.computeTestGrades(result, testSession.test);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create test result. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return newResult;
  }

  /*
   * computeTestGrades computes the breakdown and score of a given
   * ungraded ResultRequestDTO and returns the graded ResultResponseDTO
   */
  async computeTestGrades(
    result: ResultRequestDTO,
    testId: string,
  ): Promise<ResultResponseDTO> {
    const studentTestAnswers: number[][][] = result.answers;
    const computedBreakdown: boolean[][] = [];
    let questionsCorrect = 0;

    try {
      const test: TestResponseDTO = await this.testService.getTestById(testId);
      test.questions.forEach((questionComponents: QuestionComponent[], i) => {
        const computedBreakdownByQuestion: boolean[] = [];
        questionComponents.forEach((questionComponent: QuestionComponent) => {
          const actualAnswer: number[] | null =
            this.getCorrectAnswer(questionComponent);

          if (actualAnswer) {
            const studentAnswer =
              studentTestAnswers[i][computedBreakdownByQuestion.length];
            const isCorrect = equalArrays(studentAnswer, actualAnswer);

            questionsCorrect += +isCorrect;
            computedBreakdownByQuestion.push(isCorrect);
          }
        });
        computedBreakdown.push(computedBreakdownByQuestion);
      });

      // compute student's score as a percentage to two decimal places (e.g. 1/3 => 33.33)
      const questionsCount = computedBreakdown.flat().length;
      const computedScore = roundTwoDecimals(
        (questionsCorrect * 100) / questionsCount,
      );

      return {
        student: result.student,
        score: computedScore,
        answers: result.answers,
        breakdown: computedBreakdown,
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to compute test grades for result=${result}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  private getCorrectAnswer(
    questionComponent: QuestionComponent,
  ): number[] | null {
    switch (questionComponent.type) {
      case QuestionComponentType.MULTIPLE_CHOICE: {
        const questionMetadata =
          questionComponent.metadata as MultipleChoiceMetadata;
        return [questionMetadata.answerIndex];
      }
      case QuestionComponentType.MULTI_SELECT: {
        const questionMetadata =
          questionComponent.metadata as MultiSelectMetadata;
        return questionMetadata.answerIndices;
      }
      case QuestionComponentType.FRACTION: {
        const questionMetadata = questionComponent.metadata as FractionMetadata;
        return [questionMetadata.numerator, questionMetadata.denominator];
      }
      case QuestionComponentType.SHORT_ANSWER: {
        const questionMetadata =
          questionComponent.metadata as ShortAnswerMetadata;
        return [questionMetadata.answer];
      }
      default: {
        return null;
      }
    }
  }

  private async addTestSessionToClass(
    id: string,
    testSessionId: string,
  ): Promise<void> {
    try {
      const classObj: Class | null = await MgClass.findByIdAndUpdate(
        id,
        {
          $push: {
            testSessions: testSessionId,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!classObj) {
        throw new Error(
          `Test session could not be added to class with id ${id}`,
        );
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to add test session to class. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getStudentLeaderBoard(
    testSessionId: string,
  ): Promise<{ topFive: Array<string>; bottomFive: Array<string> }> {
    try {
      const testSession: TestSessionResponseDTO = await this.getTestSessionById(
        testSessionId,
      );

      // Check if the endDate for the test session has passed
      const currentDate: Date = new Date();
      if (testSession.endDate > currentDate) {
        throw new Error(
          `Test session has not ended yet. testSessionId: ${testSessionId}`,
        );
      }

      const results: ResultResponseDTO[] = testSession.results || [];

      // Sort the results based on the score in descending order
      const sortedResults: ResultResponseDTO[] = results.sort(
        (a, b) => b.score - a.score,
      );

      // Get the top 5 students' IDs
      const topFiveStudents: string[] = sortedResults
        .slice(0, 5)
        .map((result) => result.student);

      // To get the bottom 5 students' IDs, we reverse the sortedResults array and then take the first 5.
      const bottomFiveStudents: string[] = sortedResults
        .reverse()
        .slice(0, 5)
        .map((result) => result.student);

      return {
        topFive: topFiveStudents,
        bottomFive: bottomFiveStudents,
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to get top and bottom 5 students. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default TestSessionService;
