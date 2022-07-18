import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";
import testSessionModel from "../../../models/testSession.model";

const { ObjectId } = require("mongodb");
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

  it("getTestSession", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionById(savedTestSession.id,);
    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(mockTestSession, res);
  });
});
