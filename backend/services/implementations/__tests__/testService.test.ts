import TestService from "../testService";

import db from "../../../testUtils/testDb";
import { mockTest } from "../../../testUtils/tests";

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
      questions: res.questions,
      admin: res.admin.toString(),
      id: res.id,
    });
  });
});
