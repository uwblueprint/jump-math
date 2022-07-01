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
    return {
      id: newTestSession.id,
      test: newTestSession.test,
      teacher: newTestSession.teacher,
      school: newTestSession.school,
      grade_level: newTestSession.grade_level,
      results: newTestSession.results,
      access_code: newTestSession.access_code,
    };
  }
}

export default TestSessionService;
