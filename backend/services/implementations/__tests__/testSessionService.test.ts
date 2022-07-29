import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";

import MgTestSession from "../../../models/testSession.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTest,
  mockTestSession,
  mockTestSessionsWithSameTestId,
  newTestResult,
  newTestResultMissingAnswer,
  testResult,
} from "../../../testUtils/testSession";
import { TestSessionResponseDTO } from "../../interfaces/testSessionService";
import TestService from "../testService";
import UserService from "../userService";

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;
  let testService: TestService;
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    testService = new TestService(userService);
    testSessionService = new TestSessionService(testService);
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

  it("getTestSession", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionById(
      savedTestSession.id,
    );
    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(mockTestSession, res);
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
  });

  it("computeTestGrades", async () => {
    testService.getTestById = jest.fn().mockReturnValue(mockTest);

    const res = await testSessionService.computeTestGrades(
      newTestResult,
      mockTest.id,
    );
    expect(res).toStrictEqual(testResult);
  });

  it("computeTestGrades with invalid test id", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.computeTestGrades(newTestResult, invalidId);
    }).rejects.toThrowError(`Test ID ${invalidId} not found`);
  });

  it("computeTestGrades with different number of answers to questions", async () => {
    testService.getTestById = jest.fn().mockReturnValue(mockTest);

    await expect(async () => {
      await testSessionService.computeTestGrades(
        newTestResultMissingAnswer,
        mockTest.id,
      );
    }).rejects.toThrowError(
      "One or more of the student's test answers was not found",
    );
  });
});
