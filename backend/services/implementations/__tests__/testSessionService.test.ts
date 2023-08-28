import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";

import MgTestSession from "../../../models/testSession.model";
import type { Class } from "../../../models/class.model";
import MgClass from "../../../models/class.model";
import {
  assertResponseMatchesExpected,
  assertResultsResponseMatchesExpected,
  mockTestSession,
  mockTestSessionsWithSameTestId,
  mockUngradedTestResult,
  mockGradedTestResult,
  mockTestSessionWithId,
  mockTestSessionsWithSameAccessCode,
  mockTestSessionWithExpiredStartDate,
  mockTestSessionWithExpiredEndDate,
  mockTestSessionsWithOneValid,
  mockTestSessionWithInvalidStartDate,
  mockTestSessionWithInvalidEndDate,
  mockTestSessionWithNoResults,
  mockTestSessionsWithEvenNumberOfResults,
} from "../../../testUtils/testSession";
import type {
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../../interfaces/testSessionService";
import TestService from "../testService";
import UserService from "../userService";
import { mockTestWithId, mockTestWithId2 } from "../../../testUtils/tests";
import { mockSchoolWithId } from "../../../testUtils/school";
import SchoolService from "../schoolService";
import { mockTeacher, testUsers } from "../../../testUtils/users";
import {
  mockClassWithId,
  testClassAfterCreation,
} from "../../../testUtils/class";
import ClassService from "../classService";

describe("mongo testSessionService", (): void => {
  let testSessionService: TestSessionService;
  let testService: TestService;
  let userService: UserService;
  let schoolService: SchoolService;
  let classService: ClassService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    schoolService = new SchoolService(userService);
    testService = new TestService();
    testSessionService = new TestSessionService(testService);
    classService = new ClassService(userService, testSessionService);

    if (expect.getState().currentTestName.includes("exclude mock values"))
      return;
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);
    userService.getUserById = jest.fn().mockReturnValue(mockTeacher);
    schoolService.getSchoolById = jest.fn().mockReturnValue(mockSchoolWithId);
    classService.getClassById = jest.fn().mockReturnValue(mockClassWithId);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTestSession for valid class id", async () => {
    const classObj: Class = await MgClass.create(testClassAfterCreation);
    const res = await testSessionService.createTestSession({
      ...mockTestSession,
      class: classObj.id,
    });

    assertResponseMatchesExpected(mockTestSession, res);
    expect(res.results).toEqual([]);

    const updatedClass = await MgClass.findById(classObj.id);
    expect(updatedClass?.testSessions.map(String)).toEqual([res.id]);
  });

  it("createTestSession for invalid class id", async () => {
    const invalidClassId = "62c248c0f79d6c3c9ebbea92";
    await expect(async () => {
      await testSessionService.createTestSession({
        ...mockTestSession,
        class: invalidClassId,
      });
    }).rejects.toThrowError(
      `Test session could not be added to class with id ${invalidClassId}`,
    );
  });

  it("create test session with invalid start date", async () => {
    const classObj: Class = await MgClass.create(testClassAfterCreation);
    await expect(async () => {
      await testSessionService.createTestSession({
        ...mockTestSessionWithInvalidStartDate,
        class: classObj.id,
      });
    }).rejects.toThrowError(`Test session start and end dates are not valid`);
  });

  it("create test session with invalid end date", async () => {
    const classObj: Class = await MgClass.create(testClassAfterCreation);
    await expect(async () => {
      await testSessionService.createTestSession({
        ...mockTestSessionWithInvalidEndDate,
        class: classObj.id,
      });
    }).rejects.toThrowError(`Test session start and end dates are not valid`);
  });

  it("getAllTestSessions", async () => {
    await MgTestSession.create(mockTestSession);

    const res = await testSessionService.getAllTestSessions();
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res[0].results ?? [],
    );
  });

  it("getTestSession", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionById(
      savedTestSession.id,
    );
    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res.results ?? [],
    );
  });

  it("get test sessions by access code for valid code", async () => {
    await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionByAccessCode(
      mockTestSession.accessCode,
    );
    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res.results ?? [],
    );
  });

  it("get test sessions by access code for invalid code", async () => {
    await MgTestSession.create(mockTestSession);
    const accessCode = "123456";
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(accessCode);
    }).rejects.toThrowError(
      `Valid Test Session with access code ${accessCode} not found`,
    );
  });

  it("get test sessions by access code for repeated code", async () => {
    await MgTestSession.create(mockTestSessionsWithSameAccessCode);
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(
        mockTestSession.accessCode,
      );
    }).rejects.toThrowError(
      `More than one valid Test Session uses the access code ${mockTestSession.accessCode}`,
    );
  });

  it("get test sessions by access code for expired start date", async () => {
    await MgTestSession.create(mockTestSessionWithExpiredStartDate);
    const accessCode = "123456";
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(accessCode);
    }).rejects.toThrowError(
      `Valid Test Session with access code ${mockTestSessionWithExpiredStartDate.accessCode} not found`,
    );
  });

  it("get test sessions by access code for expired end date", async () => {
    await MgTestSession.create(mockTestSessionWithExpiredEndDate);
    const accessCode = "123456";
    await expect(async () => {
      await testSessionService.getTestSessionByAccessCode(accessCode);
    }).rejects.toThrowError(
      `Valid Test Session with access code ${mockTestSessionWithExpiredStartDate.accessCode} not found`,
    );
  });

  it("get test sessions by access code for repeated code but only one valid", async () => {
    await MgTestSession.create(mockTestSessionsWithOneValid);
    const res = await testSessionService.getTestSessionByAccessCode(
      mockTestSessionsWithOneValid[0].accessCode,
    );
    assertResponseMatchesExpected(mockTestSessionsWithOneValid[1], res);
    assertResultsResponseMatchesExpected(
      mockTestSessionsWithOneValid[1].results,
      res.results ?? [],
    );
  });

  it("get test sessions by school id for valid id", async () => {
    await MgTestSession.create(mockTestSession);
    const res = await testSessionService.getTestSessionsBySchoolId(
      mockTestSession.school,
    );
    assertResponseMatchesExpected(mockTestSession, res[0]);
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res[0].results ?? [],
    );
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
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res[0].results ?? [],
    );
  });

  it("getTestSessionsByTeacherId for valid teacher id with limit", async () => {
    const activeTestSession = mockTestSession;
    const upcomingTestSession = {
      ...mockTestSession,
      startDate: new Date("2022-09-10T09:00:00.000Z"),
    };
    const pastTestSession = {
      ...mockTestSession,
      endDate: new Date("2020-09-10T09:00:00.000Z"),
    };

    await Promise.all(
      Array(3)
        .fill(0)
        .map(() =>
          Promise.all([
            MgTestSession.create(activeTestSession),
            MgTestSession.create(upcomingTestSession),
            MgTestSession.create(pastTestSession),
          ]),
        ),
    );

    // execute
    const res = await testSessionService.getTestSessionsByTeacherId(
      mockTestSession.teacher,
      2,
      new Date("2022-01-01T09:00:00.000Z"),
    );

    // assert
    const countByStatus = res.reduce(
      (acc, testSession) => {
        acc[testSession.status] += 1;
        return acc;
      },
      { ACTIVE: 0, UPCOMING: 0, PAST: 0 },
    );
    expect(countByStatus.ACTIVE).toEqual(2);
    expect(countByStatus.UPCOMING).toEqual(2);
    expect(countByStatus.PAST).toEqual(2);
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
        mockTestSessionsWithSameTestId[i].results,
        testSession.results ?? [],
      );
    });
  });

  it("getTestSessionsByTestId for non-existing id", async () => {
    await MgTestSession.create(mockTestSession);
    const testId = "62c248c0f79d6c3c9ebbea96";

    const res = await testSessionService.getTestSessionsByTestId(testId);
    expect(res.length).toEqual(0);
  });

  describe("deleteTestSession", () => {
    it("with valid test session id and upcoming start date", async () => {
      const savedTestSession = await MgTestSession.create(mockTestSession);

      const deletedTestSessionId = await testSessionService.deleteTestSession(
        savedTestSession.id,
        new Date("2020-09-01T09:00:00.000Z"),
      );
      expect(deletedTestSessionId).toBe(savedTestSession.id);
    });

    it("with test session that already started", async () => {
      const savedTestSession = await MgTestSession.create(mockTestSession);

      await expect(async () => {
        await testSessionService.deleteTestSession(savedTestSession.id);
      }).rejects.toThrowError(
        `Test Session id ${savedTestSession.id} not found or test session has already started`,
      );
    });

    it("with invalid test session id", async () => {
      const notFoundId = "62cf26998b7308f775a572aa";
      await expect(async () => {
        await testSessionService.deleteTestSession(notFoundId);
      }).rejects.toThrowError(
        `Test Session id ${notFoundId} not found or test session has already started`,
      );
    });
  });

  it("computeTestGrades", async () => {
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

    const res = await testSessionService.gradeTestResult(
      mockUngradedTestResult,
      mockTestSessionWithId.test,
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
    const testSession = await MgTestSession.create(mockTestSession);

    // create DTO object to update to
    const updatedTestSession: TestSessionRequestDTO = {
      test: mockTestWithId2.id,
      teacher: testUsers[0].id,
      school: "62c248c0f79d6c3c9ebbea92",
      class: mockClassWithId.id,
      startDate: new Date("2022-09-10T09:00:00.000Z"),
      endDate: new Date("2022-09-11T09:00:00.000Z"),
    };

    // update test and assert
    const res = await testSessionService.updateTestSession(
      testSession.id,
      updatedTestSession,
    );
    assertResponseMatchesExpected(updatedTestSession, res);
    assertResultsResponseMatchesExpected(
      mockTestSession.results,
      res.results ?? [],
    );
  });

  it("updateTestSession for non-existing ID", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.updateTestSession(invalidId, mockTestSession);
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });

  it("createTestSessionResult", async () => {
    const testSession = await MgTestSession.create(mockTestSession);
    const res = await testSessionService.createTestSessionResult(
      testSession.id,
      mockUngradedTestResult,
    );

    assertResponseMatchesExpected(mockTestSession, res);
    assertResultsResponseMatchesExpected(
      [mockGradedTestResult, mockGradedTestResult],
      res.results ?? [],
    );
  });

  it("createTestSessionResult for non-existing ID", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.createTestSessionResult(
        invalidId,
        mockUngradedTestResult,
      );
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });

  it("getMarkDistribution", async () => {
    const testSession = await MgTestSession.create(
      mockTestSessionsWithEvenNumberOfResults[0],
    );
    const markDistribution: Array<number> =
      await testSessionService.getMarkDistribution(testSession.id);

    // Scores:[66.67, 33.33, 83.33, 66.67, 33.33]
    // Counts: [0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0]
    expect(markDistribution).toEqual([0, 0, 0, 40, 0, 0, 40, 0, 20, 0, 0]);
  });

  it("getMarkDistribution for test session with no results", async () => {
    const testSession = await MgTestSession.create({
      ...mockTestSession,
      results: [],
    });
    await expect(async () => {
      await testSessionService.getMarkDistribution(testSession.id);
    }).rejects.toThrowError(
      `There are no results for the test session with id ${testSession.id}`,
    );
  });

  it("getMarkDistribution for non-existing ID", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.getMarkDistribution(invalidId);
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });

  it("getPerformanceByQuestion", async () => {
    const testSession = await MgTestSession.create(
      mockTestSessionsWithEvenNumberOfResults[0],
    );
    const performanceByQuestion: Array<number> =
      await testSessionService.getPerformanceByQuestion(testSession.id);

    // Counts: [14/25, 3/5]
    expect(performanceByQuestion).toEqual([56, 60]);
  });

  it("getPerformanceByQuestion for test session with no results", async () => {
    const testSession = await MgTestSession.create({
      ...mockTestSession,
      results: [],
    });
    await expect(async () => {
      await testSessionService.getPerformanceByQuestion(testSession.id);
    }).rejects.toThrowError(
      `There are no results for the test session with id ${testSession.id}`,
    );
  });

  it("getPerformanceByQuestion for non-existing ID", async () => {
    const invalidId = "62c248c0f79d6c3c9ebbea94";

    await expect(async () => {
      await testSessionService.getPerformanceByQuestion(invalidId);
    }).rejects.toThrowError(`Test Session id ${invalidId} not found`);
  });

  it("getStudentLeaderBoard returns top and bottom 5 students", async () => {
    const savedTestSession = await MgTestSession.create(
      mockTestSessionWithExpiredEndDate,
    );

    const { topFive, bottomFive } =
      await testSessionService.getStudentLeaderBoard(savedTestSession.id);

    expect(topFive).toEqual([
      "some-student-name-3",
      "some-student-name",
      "some-student-name-2",
      "some-student-name-4",
      "some-student-name-5",
    ]);

    expect(bottomFive).toEqual([
      "some-student-name-6",
      "some-student-name-5",
      "some-student-name-4",
      "some-student-name-2",
      "some-student-name",
    ]);
  });

  it("getStudentLeaderBoard with no results", async () => {
    const savedTestSession = await MgTestSession.create(
      mockTestSessionWithNoResults,
    );

    const { topFive, bottomFive } =
      await testSessionService.getStudentLeaderBoard(savedTestSession.id);

    expect(topFive).toEqual([]);
    expect(bottomFive).toEqual([]);
  });

  it("getStudentLeaderBoard with an error retrieving test session", async () => {
    const testSessionId = "62c248c0f79d6c3c8ebbea92";

    await expect(
      testSessionService.getStudentLeaderBoard(testSessionId),
    ).rejects.toThrowError(
      "Test Session id 62c248c0f79d6c3c8ebbea92 not found",
    );
  });

  it("should throw an error if the test session's end date has not passed", async () => {
    const savedTestSession = await MgTestSession.create(mockTestSession);

    await expect(
      testSessionService.getStudentLeaderBoard(savedTestSession.id),
    ).rejects.toThrowError(
      `Test session has not ended yet. testSessionId: ${savedTestSession.id}`,
    );
  });
});
