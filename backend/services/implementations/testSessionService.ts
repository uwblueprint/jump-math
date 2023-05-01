import MgTestSession, {
  GradingStatus,
  TestSession,
} from "../../models/testSession.model";
import {
  ITestSessionService,
  ResultRequestDTO,
  ResultResponseDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  MultiSelectMetadata,
  MultipleChoiceMetadata,
  ShortAnswerMetadata,
  QuestionComponent,
  QuestionComponentType,
} from "../../models/test.model";
import { ITestService, TestResponseDTO } from "../interfaces/testService";
import IUserService from "../interfaces/userService";
import { ISchoolService, SchoolResponseDTO } from "../interfaces/schoolService";
import { UserDTO } from "../../types";

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
    let testDTO: TestResponseDTO;
    let teacherDTO: UserDTO;
    let schoolDTO: SchoolResponseDTO;
    let newTestSession: TestSession | null;

    try {
      testDTO = await this.testService.getTestById(testSession.test);
      teacherDTO = await this.userService.getUserById(testSession.teacher);
      schoolDTO = await this.schoolService.getSchoolById(testSession.school);

      newTestSession = await MgTestSession.create(testSession);
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
      gradeLevel: newTestSession.gradeLevel,
      results: [],
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

  async getTestSessionByAccessCode(
    accessCode: string,
  ): Promise<TestSessionResponseDTO> {
    let testSessionDtos: Array<TestSessionResponseDTO> = [];

    try {
      const testSessions: Array<TestSession> = await MgTestSession.find({
        accessCode: { $eq: accessCode },
      });

      if (!testSessions.length) {
        throw new Error(
          `Test Session with access code ${accessCode} not found`,
        );
      } else if (testSessions.length > 1) {
        throw new Error(
          `More than one Test Session uses the access code ${accessCode}`,
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
          gradeLevel: testSession.gradeLevel,
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
          startTime: testSession.startTime,
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

      updatedTestSession = await MgTestSession.findOneAndUpdate(
        { _id: id },
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
    let resultResponseDTO: ResultResponseDTO;

    // the list of a student's answers with each field being either the:
    // - numeric answer (for short answer)
    // - index (for multiple choice)
    // - list of indices (for multiple select)
    // - null (for no answer)
    const studentTestAnswers: (number[] | number | null)[][] = result.answers;

    let computedScore = 0.0;
    const computedBreakdown: boolean[][] = [];
    let questionsCorrect = 0;
    let questionsCount = 0;

    try {
      const test: TestResponseDTO = await this.testService.getTestById(testId);
      test.questions.forEach((questionComponents: QuestionComponent[], i) => {
        const computedBreakdownByQuestion: boolean[] = [];
        questionComponents.forEach((questionComponent: QuestionComponent) => {
          const { type } = questionComponent;
          const singleResponse =
            type === QuestionComponentType.MULTIPLE_CHOICE ||
            type === QuestionComponentType.SHORT_ANSWER;
          const multiResponse = type === QuestionComponentType.MULTI_SELECT;
          let isCorrect = false;

          if (singleResponse) {
            const actualAnswer: number = this.getCorrectAnswer(
              questionComponent,
            );
            const studentAnswer = studentTestAnswers[i][questionsCount] as
              | number
              | null;

            isCorrect = studentAnswer === actualAnswer;
          } else if (multiResponse) {
            const actualAnswers: number[] = this.getCorrectAnswers(
              questionComponent,
            );
            const studentAnswers = studentTestAnswers[i][questionsCount] as
              | number[]
              | null;
            isCorrect =
              studentAnswers?.length === actualAnswers.length &&
              studentAnswers.every((val, idx) => val === actualAnswers[idx]);
          }

          if (singleResponse || multiResponse) {
            if (isCorrect) {
              questionsCorrect += 1;
              computedBreakdownByQuestion.push(true);
            } else {
              computedBreakdownByQuestion.push(false);
            }
            questionsCount += 1;
          }
        });
        computedBreakdown.push(computedBreakdownByQuestion);
      });

      // compute student's score as a percentage to two decimal places (e.g. 1/3 => 33.33)
      computedScore = parseFloat(
        ((questionsCorrect * 100) / questionsCount).toFixed(2),
      );

      resultResponseDTO = {
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

    return resultResponseDTO;
  }

  private getCorrectAnswer(questionComponent: QuestionComponent): number {
    let actualAnswer: number;

    if (questionComponent.type === QuestionComponentType.MULTIPLE_CHOICE) {
      const questionMetadata = questionComponent.metadata as MultipleChoiceMetadata;
      actualAnswer = questionMetadata.answerIndex;
    } else if (questionComponent.type === QuestionComponentType.SHORT_ANSWER) {
      const questionMetadata = questionComponent.metadata as ShortAnswerMetadata;
      actualAnswer = questionMetadata.answer;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return actualAnswer!;
  }

  private getCorrectAnswers(questionComponent: QuestionComponent): number[] {
    const questionMetadata = questionComponent.metadata as MultiSelectMetadata;
    const actualAnswers: number[] = questionMetadata.answerIndices;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return actualAnswers!;
  }
}

export default TestSessionService;
