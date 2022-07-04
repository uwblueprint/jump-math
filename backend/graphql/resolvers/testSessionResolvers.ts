import TestSessionService from "../../services/implementations/testSessionService";
import {
    CreateTestSessionRequestDTO,
    CreateTestSessionResponseDTO,
} from "../../services/interfaces/testSessionService";

const testSessionService = new TestSessionService();

const testSessionResolvers = {
  Mutation: {
    createTestSession: async (
      _req: undefined,
      { newTestSession }: { newTestSession: CreateTestSessionRequestDTO },
    ): Promise<CreateTestSessionResponseDTO> => {
      return testSessionService.createTestSession({
        test: newTestSession.test,
        teacher: newTestSession.teacher,
        school: newTestSession.school,
        grade_level: newTestSession.grade_level,
        access_code: newTestSession.access_code,
        start_time: newTestSession.start_time,
      });
    },
  },
};

export default testSessionResolvers;
