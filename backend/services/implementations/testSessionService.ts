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
      grade_level: newTestSession.grade_level,
      access_code: newTestSession.access_code,
      start_time: newTestSession.start_time,
    };
  }
}

export default TestSessionService;
