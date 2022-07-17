import TestSessionService from "../testSessionService";


import db from "../../../testUtils/testDb";
import MgTestSession from "../../../models/testSession.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTestSession,
} from "../../../testUtils/testSession";

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

    // TODO: uncomment when results are added to test session response object
    assertResponseMatchesExpected(mockTestSession, res);
    expect(res.results).toBeUndefined();
  });

  it("getAllTestSessions", async () => {
    await MgTestSession.create(mockTestSession);

    const res = await testSessionService.getAllTestSessions();
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(mockTestSession, res[0]);
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
