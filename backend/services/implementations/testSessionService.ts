import MgTestSession, {
  GradingStatus,
  TestSession,
} from "../../models/testSession.model";
import MgClass, { Class } from "../../models/class.model";
import {
  ITestSessionService,
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { ITestService, TestResponseDTO } from "../interfaces/testService";
import IUserService from "../interfaces/userService";
import { ISchoolService, SchoolResponseDTO } from "../interfaces/schoolService";
import { UserDTO } from "../../types";
import {
  QuestionComponent,
  QuestionComponentType,
} from "../../types/questionTypes";
import {
  MultipleChoiceMetadata,
  ShortAnswerMetadata,
  MultiSelectMetadata,
  FractionMetadata,
} from "../../types/questionMetadataTypes";
import { equalArrays, roundTwoDecimals } from "../../utilities/generalUtils";

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
    classId: string,
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO> {
    let testDTO: TestResponseDTO;
    let teacherDTO: UserDTO;
    let schoolDTO: SchoolResponseDTO;
    let newTestSession: TestSession | null;

    try {
      testDTO = await this.testService.getTestById(testSession.test);
      teacherDTO = await this.userService.getUserById(testSession.teacher);
      schoolDTO = await this.schoolService.getSchoolById(testSession.school);

      newTestSession = await MgTestSession.create(testSession);

      await this.addTestSessionToClass(classId, newTestSession.id);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create test session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: newTestSession.id,
      test: testDTO,
      teacher: teacherDTO,
      school: schoolDTO,
      results: [],
      accessCode: newTestSession.accessCode,
      startDate: newTestSession.startDate,
      endDate: newTestSession.endDate,
      notes: newTestSession.notes,
    };
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
    return (await this.mapTestSessionsToTestSessionDTOs([testSession]))[0];
  }

  async getTestSessionByAccessCode(
    accessCode: string,
  ): Promise<TestSessionResponseDTO> {
    let testSessionDtos: Array<TestSessionResponseDTO> = [];
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

      testSessionDtos = await this.mapTestSessionsToTestSessionDTOs(
        testSessions,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get Test Session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return testSessionDtos[0];
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
    let testSessionDtos: Array<TestSessionResponseDTO> = [];

    try {
      const testSessions: Array<TestSession> = await MgTestSession.find();
      testSessionDtos = await this.mapTestSessionsToTestSessionDTOs(
        testSessions,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return testSessionDtos;
  }

  async getTestSessionsByTeacherId(
    teacherId: string,
  ): Promise<Array<TestSessionResponseDTO>> {
    let testSessionDtos: Array<TestSessionResponseDTO> = [];

    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        teacher: { $eq: teacherId },
      });

      testSessionDtos = await this.mapTestSessionsToTestSessionDTOs(
        testSessions,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions for teacherId=${teacherId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return testSessionDtos;
  }

  async getTestSessionsByTestId(
    testId: string,
  ): Promise<Array<TestSessionResponseDTO>> {
    let testSessionDtos: Array<TestSessionResponseDTO> = [];

    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        test: { $eq: testId },
      });

      testSessionDtos = await this.mapTestSessionsToTestSessionDTOs(
        testSessions,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions by testId=${testId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return testSessionDtos;
  }

  private async mapTestSessionsToTestSessionDTOs(
    testSessions: Array<TestSession>,
  ): Promise<Array<TestSessionResponseDTO>> {
    const testSessionDtos: Array<TestSessionResponseDTO> = await Promise.all(
      testSessions.map(async (testSession) => {
        const testDTO: TestResponseDTO = await this.testService.getTestById(
          testSession.test,
        );
        const teacherDTO: UserDTO = await this.userService.getUserById(
          testSession.teacher,
        );
        const schoolDTO: SchoolResponseDTO = await this.schoolService.getSchoolById(
          testSession.school,
        );

        return {
          id: testSession.id,
          test: testDTO,
          teacher: teacherDTO,
          school: schoolDTO,
          results: testSession.results
            ? testSession.results.map((testSessionResult) => {
                return {
                  student: testSessionResult.student,
                  score: testSessionResult.score,
                  answers: testSessionResult.answers,
                  breakdown: testSessionResult.breakdown,
                  gradingStatus: testSessionResult.gradingStatus,
                };
              })
            : [],
          accessCode: testSession.accessCode,
          startDate: testSession.startDate,
          endDate: testSession.endDate,
          notes: testSession.notes,
        };
      }),
    );

    return testSessionDtos;
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
    return (
      await this.mapTestSessionsToTestSessionDTOs([updatedTestSession])
    )[0];
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

    return (
      await this.mapTestSessionsToTestSessionDTOs([updatedTestSession])
    )[0];
  }

  async getTestSessionsBySchoolId(
    schoolId: string,
  ): Promise<TestSessionResponseDTO[]> {
    let testSessionDtos: Array<TestSessionResponseDTO> = [];

    try {
      const testSessions: TestSession[] = await MgTestSession.find({
        school: { $eq: schoolId },
      });

      testSessionDtos = await this.mapTestSessionsToTestSessionDTOs(
        testSessions,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return testSessionDtos;
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
      newResult = await this.computeTestGrades(result, testSession.test.id);
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
          const actualAnswer: number[] | null = this.getCorrectAnswer(
            questionComponent,
          );

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
        gradingStatus: GradingStatus.GRADED,
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
        const questionMetadata = questionComponent.metadata as MultipleChoiceMetadata;
        return [questionMetadata.answerIndex];
      }
      case QuestionComponentType.MULTI_SELECT: {
        const questionMetadata = questionComponent.metadata as MultiSelectMetadata;
        return questionMetadata.answerIndices;
      }
      case QuestionComponentType.FRACTION: {
        const questionMetadata = questionComponent.metadata as FractionMetadata;
        return [questionMetadata.numerator, questionMetadata.denominator];
      }
      case QuestionComponentType.SHORT_ANSWER: {
        const questionMetadata = questionComponent.metadata as ShortAnswerMetadata;
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
}

export default TestSessionService;
