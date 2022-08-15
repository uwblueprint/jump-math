import TestSessionService from "../testSessionService";

import db from "../../../testUtils/testDb";

import MgTestSession from "../../../models/testSession.model";
import TestService from "../testService";
import UserService from "../userService";
import { mockTestWithId } from "../../../testUtils/tests";
import SchoolService from "../schoolService";
import StatisticsService from "../statisticsService";
import {
  assertResponseMatchesExpected,
  mockStatisticsBySchool,
  mockTestSessions,
} from "../../../testUtils/statistics";
import { StatisticsBySchoolDTO } from "../../interfaces/statisticsService";
import { mockSchoolWithId, mockSchoolWithId2 } from "../../../testUtils/school";

describe("mongo statisticsService", (): void => {
  let statisticsService: StatisticsService;
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
    statisticsService = new StatisticsService(
      testSessionService,
      testService,
      userService,
      schoolService,
    );
  });

  afterEach(async () => {
    await db.clear();
  });

  it("getAverageScoresBySchool", async () => {
    await MgTestSession.insertMany(mockTestSessions);
    testService.getTestById = jest.fn().mockReturnValue(mockTestWithId);
    schoolService.getSchoolById = jest
      .fn()
      .mockReturnValueOnce(mockSchoolWithId2)
      .mockReturnValueOnce(mockSchoolWithId);

    const res = await statisticsService.getAverageScoresBySchool(
      mockTestWithId.id,
    );
    expect(res.length).toEqual(mockStatisticsBySchool.length);
    res.forEach((schoolStatistic: StatisticsBySchoolDTO, i) => {
      assertResponseMatchesExpected(mockStatisticsBySchool[i], schoolStatistic);
    });
  });

  it("getAverageScoresBySchool for invalid test id", async () => {
    await MgTestSession.insertMany(mockTestSessions);

    const res = await statisticsService.getAverageScoresBySchool(
      "62c248c0f79d6c3c9ebbea90",
    );
    expect(res).toEqual([]);
  });
});
