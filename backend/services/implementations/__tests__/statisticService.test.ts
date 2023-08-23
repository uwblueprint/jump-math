import StatisticService from "../statisticService";

import db from "../../../testUtils/testDb";

import MgTestSession from "../../../models/testSession.model";
import {
  createTestSessionWithSchoolAndResults,
  mockTestSessions,
  mockTestSessionsWithEvenNumberOfResults,
} from "../../../testUtils/testSession";
import { createSchoolWithCountry } from "../../../testUtils/school";
import type { TestStatistic } from "../../interfaces/statisticService";
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

  it("getTestGradeStatisticsByCountry", async () => {
    // insert school with given country
    const school = await createSchoolWithCountry("Canada");
    // create mock results
    // average of two results is (100 + 0) / 2 = 50
    // average for single question is (100 + 0) / 2 = 50
    const results = [
      {
        student: "student-1",
        score: 0,
        answers: [[[10.5]]],
        breakdown: [[false]],
      },
      {
        student: "some-student-name",
        score: 100,
        answers: [[[11.5]]],
        breakdown: [[true]],
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

  it("getTestGradeStatisticsBySchool", async () => {
    await MgTestSession.insertMany(mockTestSessions);

    const actualResult = await statisticService.getTestGradeStatisticsBySchool(
      mockTestWithId.id,
    );
    expect(actualResult).toEqual(mockTestStatisticsBySchool);
  });

  describe("getSubmissionCountByTest", () => {
    it("with multiple submissions", async () => {
      await MgTestSession.insertMany(mockTestSessions);

      const actualResult = await statisticService.getSubmissionCountByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(13);
    });

    it("with 0 submissions", async () => {
      const actualResult = await statisticService.getSubmissionCountByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(0);
    });
  });

  describe("getMeanScoreByTest", () => {
    it("with multiple submissions", async () => {
      await MgTestSession.insertMany(mockTestSessions);

      // Scores: [66.67, 33.33, 83.33, 33.33, 33.33, 66.67, 83.33, 33.33, 66.67, 33.33, 33.33, 33.33, 33.33]
      const actualResult = await statisticService.getMeanScoreByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(48.72);
    });

    it("with 0 submissions", async () => {
      const actualResult = await statisticService.getMeanScoreByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(0);
    });
  });

  describe("getMedianScoreByTest", () => {
    it("with odd number of submissions", async () => {
      await MgTestSession.insertMany(mockTestSessions);

      // Scores: [66.67, 33.33, 83.33, 33.33, 33.33, 66.67, 83.33, 33.33, 66.67, 33.33, 33.33, 33.33, 33.33]
      const actualResult = await statisticService.getMedianScoreByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(33.33);
    });

    it("with even number of submissions", async () => {
      await MgTestSession.insertMany(mockTestSessionsWithEvenNumberOfResults);

      // Scores: [66.67, 66.67, 33.33, 33.33, 83.33, 83.33, 33.33, 33.33]
      const actualResult = await statisticService.getMedianScoreByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(50);
    });

    it("with 0 submissions", async () => {
      const actualResult = await statisticService.getMedianScoreByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(0);
    });
  });

  describe("getCompletionRateByTest", () => {
    it("with multiple submissions", async () => {
      await MgTestSession.insertMany(mockTestSessions);

      const actualResult = await statisticService.getCompletionRateByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(77);
    });

    it("with 0 submissions", async () => {
      const actualResult = await statisticService.getCompletionRateByTest(
        mockTestWithId.id,
      );
      expect(actualResult).toEqual(0);
    });
  });

  describe("getMarkDistributionByTest", () => {
    it("with multiple submissions", async () => {
      await MgTestSession.insertMany(mockTestSessions);

      const actualResult = await statisticService.getMarkDistributionByTest(
        mockTestWithId.id,
      );

      // Scores: [66.67, 33.33, 83.33, 33.33, 33.33, 66.67, 83.33, 33.33, 66.67, 33.33, 33.33, 33.33, 33.33]
      // Result: [0, 0, 0, 8/13 * 100, 0, 0, 3/13 * 100, 0, 2/13 * 100, 0, 0]
      expect(actualResult).toEqual([
        0, 0, 0, 61.54, 0, 0, 23.08, 0, 15.38, 0, 0,
      ]);
    });

    it("with 0 submissions", async () => {
      await expect(async () => {
        await statisticService.getMarkDistributionByTest(mockTestWithId.id);
      }).rejects.toThrowError(
        `There are no results for the test with id ${mockTestWithId.id}`,
      );
    });
  });
});
