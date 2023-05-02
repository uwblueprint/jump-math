import StatisticService from "../statisticService";

import db from "../../../testUtils/testDb";

import MgTestSession, {
  GradingStatus,
} from "../../../models/testSession.model";
import {
  createTestSessionWithSchoolAndResults,
  mockTestSessions,
} from "../../../testUtils/testSession";
import { createSchoolWithCountry } from "../../../testUtils/school";
import { TestStatistic } from "../../interfaces/statisticService";
import mockTestStatisticsBySchool from "../../../testUtils/statistics";
import { mockTestWithId } from "../../../testUtils/tests";

describe("mongo statisticService", (): void => {
  let statisticService: StatisticService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    statisticService = new StatisticService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("testing stats service", async () => {
    // insert school with given country
    const school = await createSchoolWithCountry("Canada");
    // create mock results
    // average of two results is (100 + 0) / 2 = 50
    // average for single question is (100 + 0) / 2 = 50
    const results = [
      {
        student: "student-1",
        score: 0,
        answers: [[10.5]],
        breakdown: [[false]],
        gradingStatus: GradingStatus.GRADED,
      },
      {
        student: "some-student-name",
        score: 100,
        answers: [[11.5]],
        breakdown: [[true]],
        gradingStatus: GradingStatus.GRADED,
      },
      // ungraded results get filtered out
      {
        student: "some-student-name",
        score: 0,
        answers: [],
        breakdown: [],
        gradingStatus: GradingStatus.UNGRADED,
      },
    ];
    // create test session with specified school and results
    await createTestSessionWithSchoolAndResults(school.id, results);

    const expectedResult = new Map<string, TestStatistic>([
      [
        "Canada",
        {
          averageScore: 50,
          averageQuestionScores: [
            [
              {
                averageScore: 50,
              },
            ],
          ],
        },
      ],
    ]);
    const actualResult = await statisticService.getTestGradeStatisticsByCountry(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(expectedResult);
  });

  it("getSubmissionCountByTest with multiple submissions", async () => {
    await MgTestSession.insertMany(mockTestSessions);

    const actualResult = await statisticService.getSubmissionCountByTest(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(13);
  });

  it("getSubmissionCountByTest with 0 submissions", async () => {
    const actualResult = await statisticService.getSubmissionCountByTest(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(0);
  });

  it("getMeanScoreByTest with multiple submissions", async () => {
    await MgTestSession.insertMany(mockTestSessions);

    const actualResult = await statisticService.getMeanScoreByTest(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(50.77);
  });

  it("getMeanScoreByTest with 0 submissions", async () => {
    const actualResult = await statisticService.getMeanScoreByTest(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(0);
  });

  it("getTestGradeStatisticsBySchool", async () => {
    await MgTestSession.insertMany(mockTestSessions);

    const actualResult = await statisticService.getTestGradeStatisticsBySchool(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(mockTestStatisticsBySchool);
  });

  it("getAverageScoresBySchool for invalid test id", async () => {
    const res = await statisticService.getTestGradeStatisticsBySchool(
      "62c248c0f79d6c3c9ebbea90",
    );
    expect(res).toEqual(new Map<string, TestStatistic>());
  });
});
