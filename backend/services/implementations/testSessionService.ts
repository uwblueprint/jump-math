import MgTestSession, { TestSession } from "../../models/testSession.model";
import {
  ITestSessionService,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IUserService from "../interfaces/userService";

const Logger = logger(__filename);

class TestSessionService implements ITestSessionService {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  /* eslint-disable class-methods-use-this */
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
      test: String(newTestSession.test),
      teacher: String(newTestSession.teacher),
      school: String(newTestSession.school),
      gradeLevel: newTestSession.gradeLevel,
      accessCode: newTestSession.accessCode,
      startTime: newTestSession.startTime,
    };
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
    let testSessions: Array<TestSession> | null;

    try {
      testSessions = await MgTestSession.find({
        teacherId: { $eq: teacherId },
      });

      // check if no testSessions are associated with the given teacherId
      if (!testSessions.length) {
        console.log(testSessions.length);
        throw new Error(`Test session for teacher id ${teacherId} not found`);
      }

      return await this.mapTestSessionsToTestSessionDTOs(testSessions);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get test sessions. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
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
}

export default TestSessionService;
