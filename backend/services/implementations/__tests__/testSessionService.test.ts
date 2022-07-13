import TestSessionService from "../testSessionService";

import MgTestSession from "../../../models/testSession.model";
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
    const savedTestSession = await MgTestSession.create(mockTestSession);;

    const deletedTestSessionId = await testSessionService.deleteTestSession(savedTestSession.id);
    expect(deletedTestSessionId).toBe(savedTestSession.id);
  });

  it("deleteTestSession not found", async () => {
    const notFoundId = "62cf26998b7308f775a572aa";
    expect(testSessionService.deleteTestSession(notFoundId)).rejects.toThrowError(`Test Session id ${notFoundId} not found`);
  });
});
