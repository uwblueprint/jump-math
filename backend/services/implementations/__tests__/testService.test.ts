import TestService from "../testService";

import db from "../../../testUtils/testDb";

const questions = [
    {
        questionType: 1,
        questionPrompt: "Question",
        questionMetadata: {
            answer: 3
        }
    }
]
export const mockTest = {
    name: "test",
    duration: 300,
    admin: "62c248c0f79d6c3c9ebbea94",
    questions: questions,
    grade: 11,
};

describe("mongo testService", (): void => {
    let testService: TestService;

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    beforeEach(async () => {
        testService = new TestService();
    });

    afterEach(async () => {
        await db.clear();
    });

    it("createTest", async () => {
        const res = await testService.createTest(mockTest);

        expect(res.id).not.toBeNull();
        expect(res).toMatchObject({
            ...mockTest,
            id: res.id,
            questions: res.questions
        });
    })
})