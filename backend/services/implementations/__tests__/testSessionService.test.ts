import TestSessionService from "../testSessionService";

import mockTestSession from "../../../testUtils/testSession";
import db from "../../../testUtils/testDb";
import testSessionModel from "../../../models/testSession.model";

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

    expect(res.id).not.toBeNull();
    expect(res).toMatchObject({
      id: res.id,
      ...mockTestSession,
    });
  });

  it("deleteTestSession", async () => {
    const testSession = new testSessionModel(mockTestSession);
    const savedTestSession = await testSession.save();

    const deletedTestSessionId = await testSessionService.deleteTestSession(savedTestSession.id);
    expect(deletedTestSessionId).toBe(savedTestSession.id);
  });

  it("deleteTestSession not found", async () => {
    expect(testSessionService.deleteTestSession("not_found_id")).rejects.toThrowError();
  });
});
