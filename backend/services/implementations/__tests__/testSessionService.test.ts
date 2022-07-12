import TestSessionService from "../testSessionService";

import mockTestSession from "../../../testUtils/testSession";
import db from "../../../testUtils/testDb";

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    testSessionService = new TestSessionService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTestSession", async () => {
    const res = await testSessionService.createTestSession(mockTestSession);
    res.test = res.test.toString()
    res.teacher = res.teacher.toString()
    res.school = res.school.toString()
    expect(res.id).not.toBeNull();
    expect(res).toMatchObject({
      id: res.id,
      ...mockTestSession,
    });
  });
});
