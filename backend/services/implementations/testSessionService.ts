import MgTestSession, { TestSession } from "../../models/testSession.model";
import {
  ITestSessionService,
  UngradedResultDTO,
  GradedResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  MultipleChoiceMetadata,
  NumericQuestionMetadata,
  Question,
  QuestionType,
} from "../../models/test.model";
import { ITestService, TestResponseDTO } from "../interfaces/testService";

const Logger = logger(__filename);

class TestSessionService implements ITestSessionService {
  /* eslint-disable class-methods-use-this */
  testService: ITestService;

  constructor(testService: ITestService) {
    this.testService = testService;
  }

  async createTestSession(
    testSession: TestSessionRequestDTO,
  ): Promise<TestSessionResponseDTO> {
    let newTestSession: TestSession | null;

    try {
      newTestSession = await MgTestSession.create(testSession);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create test session. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    // TODO: Add validation for test, teacher and school ids via
    //       getTestById, getTeacherById and getSchoolById

    return {
      id: newTestSession.id,
      test: newTestSession.test,
      teacher: newTestSession.teacher,
      school: newTestSession.school,
      gradeLevel: newTestSession.gradeLevel,
      accessCode: newTestSession.accessCode,
      startTime: newTestSession.startTime,
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
        return {
          id: testSession.id,
          test: testSession.test,
          teacher: testSession.teacher,
          school: testSession.school,
          gradeLevel: testSession.gradeLevel,
          results: testSession.results?.map((testSessionResult) => {
            return {
              id: testSessionResult.id,
              student: testSessionResult.student,
              score: testSessionResult.score,
              answers: testSessionResult.answers,
              breakdown: testSessionResult.breakdown,
            };
          }),
          accessCode: testSession.accessCode,
          startTime: testSession.startTime,
        };
      }),
    );

    return testSessionDtos;
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
   * computeTestGrades computes the breakdown and score of a given 
   * UngradedResultDTO and returns the GradedResultResponseDTO
   */
  async computeTestGrades(
    result: UngradedResultDTO,
    testId: string,
  ): Promise<GradedResultResponseDTO> {
    let gradedResultResponseDTO: GradedResultResponseDTO;

    // the list of a student's answers with each field being either the 
    // numeric answer (for short answer) or index (for multiple choice)
    const studentAnswers: (number | null)[] = result.answers;
   
    let computedScore = 0.00;
    let computedBreakdown: boolean[] = [];
    let questionsCorrect = 0;

    try {
      const test: TestResponseDTO = await this.testService.getTestById(testId);

      test.questions.forEach((question: Question, i) => {
        let actualAnswer: number;

        if (question.questionType === QuestionType.MULTIPLE_CHOICE) {
          const questionMetadata = question.questionMetadata as MultipleChoiceMetadata;
          actualAnswer = questionMetadata.answerIndex;
        } else {
          const questionMetadata = question.questionMetadata as NumericQuestionMetadata;
          actualAnswer = questionMetadata.answer;
        }

        if (studentAnswers[i] === actualAnswer) {
          questionsCorrect += 1;
          computedBreakdown[i] = true;
        } else {
          computedBreakdown[i] = false;
        }
      });

      // compute student's score as a percentage to two decimal places (e.g. 1/3 => 33.33)
      computedScore = parseFloat(
        ((questionsCorrect * 100) / studentAnswers.length).toFixed(2),
      );

      gradedResultResponseDTO = {
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

    return gradedResultResponseDTO;
  }
}

export default TestSessionService;
