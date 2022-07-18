import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";
import testSessionModel from "../../../models/testSession.model";

const { ObjectId } = require("mongodb");
import MgTestSession from "../../../models/testSession.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTestSession,
  mockTestSessionsWithSameTestId,
} from "../../../testUtils/testSession";
import { TestSessionResponseDTO } from "../../interfaces/testSessionService";

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

<<<<<<< HEAD
  it("getTestSession", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionById(savedTestSession.id,);
    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(mockTestSession, res);
=======
  it("getTestSessionsByTeacherId for valid teacher id", async () => {
    await MgTestSession.create(mockTestSession);

    // execute
    const res = await testSessionService.getTestSessionsByTeacherId(
      mockTestSession.teacher,
    );

    // assert
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(mockTestSession, res[0]);
  });

  it("getTestSessionsByTeacherId for invalid teacher id", async () => {
    await MgTestSession.create(mockTestSession);
    const invalidId = "56cb91bdc3464f14678934ca";

    const res = await testSessionService.getTestSessionsByTeacherId(invalidId);
    expect(res.length).toEqual(0);
  });
  
  it("getTestSessionsByTestId", async () => {
    await MgTestSession.create(mockTestSessionsWithSameTestId);
    const testId = "62c248c0f79d6c3c9ebbea95";

    const res = await testSessionService.getTestSessionsByTestId(testId);
    expect(res.length).toEqual(mockTestSessionsWithSameTestId.length);
    res.forEach((testSession: TestSessionResponseDTO, i) => {
      assertResponseMatchesExpected(
        mockTestSessionsWithSameTestId[i],
        testSession,
      );
      assertResultsResponseMatchesExpected(
        mockTestSessionsWithSameTestId[i],
        testSession,
      );
    });
  });

  it("getTestSessionsByTestId for non-existing id", async () => {
    await MgTestSession.create(mockTestSession);
    const testId = "62c248c0f79d6c3c9ebbea96";

    const res = await testSessionService.getTestSessionsByTestId(testId);
    expect(res.length).toEqual(0);
  });

  it("deleteTestSession", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);

    const deletedTestSessionId = await testSessionService.deleteTestSession(
      savedTestSession.id,
    );
    expect(deletedTestSessionId).toBe(savedTestSession.id);
  });

  it("deleteTestSession not found", async () => {
    const notFoundId = "62cf26998b7308f775a572aa";
    expect(
      testSessionService.deleteTestSession(notFoundId),
    ).rejects.toThrowError(`Test Session id ${notFoundId} not found`);
>>>>>>> staging
  });
});
