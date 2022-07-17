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

  it("get test sessions by school id for valid id", async () => {
    await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionsBySchoolId(
      mockTestSession.school,
    );
    assertResultsResponseMatchesExpected(mockTestSession, res[0]);
  });

  it("get test sessions by school id for invalid id", async () => {
    await MgTestSession.create(mockTestSession);
    // school id that's different than the created test session
    const schoolId = "62c248c0f79d6c3c9ebbea94";
    const res = await testSessionService.getTestSessionsBySchoolId(schoolId);
    expect(res.length).toEqual(0);
  });
});
