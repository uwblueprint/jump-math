import { CreateTestRequestDTO, SchoolTestDTO } from "../../types";

export interface ITestService {
    /**
     * create a new Test with the fields given in the DTO test, return created Test
     * @param test CreateTestRequest object containing test info
     * @returns a TestDTO with the created test
     * @throws Error if creation fails
     */
    createTest(
        test: CreateTestRequestDTO,
    ): Promise<SchoolTestDTO>;
} 