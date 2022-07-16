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

    assertResponseMatchesExpected(mockTestSession, res);
    expect(res.results).toBeUndefined();
  });

  it("getAllTestSessions", async () => {
    await MgTestSession.create(mockTestSession);

    const res = await testSessionService.getAllTestSessions();
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(mockTestSession, res[0]);
  });

  it("getTestSessionsByTestId", async () => {
    await MgTestSession.create(mockTestSession);
    const testId = "62c248c0f79d6c3c9ebbea95";

    const res = await testSessionService.getTestSessionsByTestId(testId);
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(mockTestSession, res[0]);
  });

  it("getTestSessionsByTestId for non-existing id", async () => {
    await MgTestSession.create(mockTestSession);
    const testId = "62c248c0f79d6c3c9ebbea96";

    const res = await testSessionService.getTestSessionsByTestId(testId);
    expect(res.length).toEqual(0);
  });
});
