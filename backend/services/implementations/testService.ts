import MgTest, { Test } from "../../models/test.model";
import { CreateTestRequestDTO, SchoolTestDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class TestService implements TestService {
    async createTest(
    test: CreateTestRequestDTO,
    ): Promise<SchoolTestDTO> {
        let newTest: Test;
        
        try{
            newTest = await MgTest.create({...test});
        } catch (error) {
            Logger.error(`Failed to create test. Reason = ${getErrorMessage(error)}`);
            throw error;
        }

        return {
            id: newTest.id,
            name: newTest.name,
            duration: newTest.duration,
            admin: newTest.admin,
            questions: newTest.questions,
            grade: newTest.grade,
        };
    }
}

export default TestService;