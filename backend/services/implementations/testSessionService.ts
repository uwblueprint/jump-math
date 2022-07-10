import MgTestSession, { TestSession } from "../../models/testSession.model";
import {
  ITestSessionService,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../interfaces/testSessionService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class TestSessionService implements ITestSessionService {
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

  async getTestSessionById(
    id: string
  ): Promise<TestSessionResponseDTO> {
    let testSession: TestSession | null;
    try{
        testSession = await MgTestSession.findById(id);
        if(!testSession){
          throw new Error(`Entity id ${id} not found`);
        } 
      }catch (error: unknown) {
        Logger.error(`Failed to get entity. Reason = ${getErrorMessage(error)}`);
        throw error;
    }
    return {
      id: testSession.id,
      test: testSession.test,
      teacher: testSession.teacher,
      school: testSession.school,
      gradeLevel: testSession.gradeLevel,
      accessCode: testSession.accessCode,
      startTime: testSession.startTime,
      results: testSession.results,
    };
  }
}

export default TestSessionService;
