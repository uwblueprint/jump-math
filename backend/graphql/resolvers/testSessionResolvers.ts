import TestSessionService from "../../services/implementations/testSessionService";
import {
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../../services/interfaces/testSessionService";

const testSessionService = new TestSessionService();

const testSessionResolvers = {
  Mutation: {
    createTestSession: async (
      _req: undefined,
      { newTestSession }: { newTestSession: TestSessionRequestDTO },
    ): Promise<TestSessionResponseDTO> => {
      return testSessionService.createTestSession({
        test: newTestSession.test,
        teacher: newTestSession.teacher,
        school: newTestSession.school,
        grade_level: newTestSession.grade_level,
        results: newTestSession.results,
        access_code: newTestSession.access_code,
        start_time: newTestSession.start_time,
      });
    },
  },
};

export default testSessionResolvers;
