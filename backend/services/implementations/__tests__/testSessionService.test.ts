import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";

import MgTestSession from "../../../models/testSession.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTestSession,
  mockTestSessionsWithSameTestId,
  mockUngradedTestResult,
  mockGradedTestResult,
  mockTestSessionWithId,
  mockTestSessionsWithSameAccessCode,
} from "../../../testUtils/testSession";
import { TestSessionResponseDTO } from "../../interfaces/testSessionService";
import TestService from "../testService";
import UserService from "../userService";
import { mockTestWithId, mockTestWithId2 } from "../../../testUtils/tests";
import { mockSchoolWithId } from "../../../testUtils/school";
import SchoolService from "../schoolService";
import { mockTeacher, testUsers } from "../../../testUtils/users";

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;
  let testService: TestService;
  let userService: UserService;
  let schoolService: SchoolService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    schoolService = new SchoolService(userService);
    testService = new TestService(userService);
    testSessionService = new TestSessionService(
      testService,
      userService,
      schoolService,
    );

    if (expect.getState().currentTestName.includes("exclude mock values"))
      return;
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);
    userService.getUserById = jest.fn().mockReturnValue(mockTeacher);
    schoolService.getSchoolById = jest.fn().mockReturnValue(mockSchoolWithId);
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

  it("get test sessions by access code for valid code", async () => {
    await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionByAccessCode(
      mockTestSession.accessCode,
    );
    assertResultsResponseMatchesExpected(mockTestSession, res);
  });

  it("get test sessions by access code for invalid code", async () => {
    await MgTestSession.create(mockTestSession);
    // school id that's different than the created test session
    const accessCode = "123456";
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(accessCode);
    }).rejects.toThrowError(
      `Test Session with access code ${accessCode} not found`,
    );
  });

  it("get test sessions by access code for repeated code", async () => {
    await MgTestSession.create(mockTestSessionsWithSameAccessCode);
    // school id that's different than the created test session
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(
        mockTestSession.accessCode,
      );
    }).rejects.toThrowError(
      `More than one Test Session uses the access code ${mockTestSession.accessCode}`,
    );
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
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);

    const res = await testSessionService.computeTestGrades(
      mockUngradedTestResult,
      mockTestWithId.id,
    );
    expect(res).toStrictEqual(mockGradedTestResult);
  });

  it("computeTestGrades with invalid test id - exclude mock values", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.computeTestGrades(
        mockUngradedTestResult,
        invalidId,
      );
    }).rejects.toThrowError(`Test ID ${invalidId} not found`);
  });

  it("gradeTestResult", async () => {
    testSessionService.getTestSessionById = jest
      .fn()
      .mockReturnValue(mockTestSessionWithId);
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);

    const res = await testSessionService.gradeTestResult(
      mockUngradedTestResult,
      mockTestSessionWithId.test.id,
    );
    expect(res).toStrictEqual(mockGradedTestResult);
  });

  it("gradeTestResult with invalid test session id", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.gradeTestResult(
        mockUngradedTestResult,
        invalidId,
      );
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });

  it("updateTestSession", async () => {
    // insert test session into database
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);
    const testSession = await MgTestSession.create(mockTestSession);

    // create DTO object to update to
    const updatedTestSession = {
      test: mockTestWithId2.id,
      teacher: testUsers[0].id,
      school: "62c248c0f79d6c3c9ebbea92",
      gradeLevel: 3,
      results: [mockGradedTestResult, mockUngradedTestResult],
      accessCode: "1235",
      startTime: new Date("2022-09-10T09:00:00.000Z"),
    };

    const updatedGradedTestSession = {
      ...updatedTestSession,
      results: [mockGradedTestResult, mockGradedTestResult],
    };

    // update test and assert
    const res = await testSessionService.updateTestSession(
      testSession.id,
      updatedTestSession,
    );
    assertResponseMatchesExpected(updatedGradedTestSession, res);
  });

  it("updateTestSession for non-existing ID", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.updateTestSession(invalidId, mockTestSession);
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });
});
