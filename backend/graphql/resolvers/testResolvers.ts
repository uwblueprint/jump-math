import TestService from "../../services/implementations/testService";
import { CreateTestRequestDTO, SchoolTestDTO } from "../../types";

const testService = new TestService();

const testResolvers = {
    Mutation: {
        createTest: async (
            _req: undefined,
            {newTest} : {newTest: CreateTestRequestDTO },
        ): Promise<SchoolTestDTO> => {
            return testService.createTest({
                name: newTest.name,
                duration: newTest.duration,
                admin: newTest.admin,
                questions: newTest.questions,
                grade: newTest.grade,
            })
        }
    }
}

export default testResolvers;