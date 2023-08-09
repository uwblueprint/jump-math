import type { PipelineStage } from "mongoose";
import MgTestSession from "../../models/testSession.model";
import type {
  IStatisticService,
  QuestionStatistic,
  TestStatistic,
} from "../interfaces/statisticService";
import type { GroupResultsByIdResultType } from "../../utilities/pipelineQueryUtils";
import {
  countTestSubmissions,
  filterTestsByTestId,
  joinSchoolIdWithSchoolDocument,
  groupResultsById,
  unwindResults,
} from "../../utilities/pipelineQueryUtils";
import {
  roundTwoDecimals,
  calculateMedianScore,
  isCompletedTestResult,
} from "../../utilities/generalUtils";

class StatisticService implements IStatisticService {
  /* eslint-disable class-methods-use-this */
  async getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Map<string, TestStatistic>> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      joinSchoolIdWithSchoolDocument,
      groupResultsById("$school.country"),
    ];

    const aggCursor: GroupResultsByIdResultType[] =
      await MgTestSession.aggregate(pipeline);

    return this.constructTestStatisticsByGroup(aggCursor, "country");
  }

  async getTestGradeStatisticsBySchool(
    testId: string,
  ): Promise<Map<string, TestStatistic>> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      groupResultsById("$school"),
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return this.constructTestStatisticsByGroup(aggCursor, "school");
  }

  /* eslint-disable class-methods-use-this */
  async getSubmissionCountByTest(testId: string): Promise<number> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      countTestSubmissions,
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return aggCursor[0]?.numSubmittedTests ?? 0;
  }

  async getMeanScoreByTest(testId: string): Promise<number> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$results.score" },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);
    const mean = aggCursor[0]?.averageScore ?? 0;
    return roundTwoDecimals(mean);
  }

  async getMedianScoreByTest(testId: string): Promise<number> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      {
        $project: {
          score: "$results.score",
        },
      },
      {
        $sort: {
          score: 1,
        },
      },
      {
        $group: {
          _id: null,
          scores: { $push: "$score" },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);
    const scores = aggCursor[0]?.scores ?? [0];
    return calculateMedianScore(scores);
  }

  async getCompletionRateByTest(testId: string): Promise<number> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      {
        $group: {
          _id: null,
          answers: { $push: "$results.answers" },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);
    const answers = aggCursor[0]?.answers ?? [];

    if (answers.length === 0) {
      return 0;
    }

    let uncompleted = 0;
    const total = answers.length;

    answers.forEach((result: Array<Array<Array<number>>>) => {
      if (!isCompletedTestResult(result)) {
        uncompleted += 1;
      }
    });

    return roundTwoDecimals((total - uncompleted) / total) * 100;
  }

  async getMarkDistributionByTest(testId: string): Promise<Array<number>> {
    const pipeline: PipelineStage[] = [
      filterTestsByTestId(testId),
      unwindResults,
      {
        $project: {
          score: "$results.score",
        },
      },
      {
        $group: {
          _id: null,
          scores: { $push: "$score" },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);
    const scores = aggCursor[0]?.scores ?? [];

    const markDistributionCount: Array<number> = Array(11).fill(0);

    scores.forEach((score: number) => {
      const bucket = Math.trunc(score / 10);
      markDistributionCount[bucket] += 1;
    });

    const totalScores = scores.length;
    if (!totalScores) throw new Error("No scores found");

    return markDistributionCount.map((count) => {
      return roundTwoDecimals((count / totalScores) * 100);
    });
  }

  private getAverageScorePerQuestion(
    resultBreakdowns: boolean[][][],
  ): QuestionStatistic[][] {
    const averageScorePerQuestion: QuestionStatistic[][] = [];
    const numQuestionGroups = resultBreakdowns[0].length;
    const numResults = resultBreakdowns.length;

    for (let i = 0; i < numQuestionGroups; i += 1) {
      const numSubQuestions = resultBreakdowns[0][i].length;
      const averageScorePerSubQuestion: QuestionStatistic[] = [];

      for (let j = 0; j < numSubQuestions; j += 1) {
        let numCorrect = 0;
        resultBreakdowns.forEach((result: boolean[][]) => {
          numCorrect += result[i][j] ? 1 : 0;
        });

        const averageScore = (numCorrect * 100) / numResults;
        averageScorePerSubQuestion.push({ averageScore });
      }

      averageScorePerQuestion.push(averageScorePerSubQuestion);
    }

    return averageScorePerQuestion;
  }

  private constructTestStatisticsByGroup(
    aggCursor: GroupResultsByIdResultType[],
    group: string,
  ): Map<string, TestStatistic> {
    const testStatistics = new Map<string, TestStatistic>();

    aggCursor.forEach((statistic: GroupResultsByIdResultType) => {
      let key = "";

      switch (group) {
        case "country":
          // eslint-disable-next-line no-underscore-dangle
          [key] = statistic._id;
          break;
        case "school":
          // eslint-disable-next-line no-underscore-dangle
          key = statistic._id.toString();
          break;
        default:
          break;
      }

      testStatistics.set(key, {
        averageScore: statistic.averageScore,
        averageQuestionScores: this.getAverageScorePerQuestion(
          statistic.resultBreakdowns,
        ),
      });
    });

    return testStatistics;
  }
}

export default StatisticService;
