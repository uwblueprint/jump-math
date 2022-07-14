import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";
import MgTestSession from "../../../models/testSession.model";
import TestSessionModel from "../../../models/testSession.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTestSession,
} from "../../../testUtils/testSession";
import UserService from "../userService";
import { TestSessionResponseDTO } from "../../interfaces/testSessionService";

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    testSessionService = new TestSessionService(userService);
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

  it("getTestSessionsByTeacherId for valid teacher id", async () => {
    await TestSessionModel.insertMany(mockTestSession);
    // execute
    const res = await testSessionService.getTestSessionsByTeacherId(mockTestSession.teacher);

    // assert
    res.forEach((testSession: TestSessionResponseDTO, i) => {
      assertResponseMatchesExpected(testSession, res[i]);
    });
  });

  it("getTestSessionsByTeacherId for invalid teacher id", async () => {
    userService.findAllUsersByIds = jest.fn().mockReturnValue([]);
    const invalidId = "1234";

    // execute and assert
    await expect(async () => {
      testSessionService.getTestSessionsByTeacherId(invalidId);
    }).rejects.toThrowError(`Test session for teacher id ${invalidId} not found`);
  });
});
