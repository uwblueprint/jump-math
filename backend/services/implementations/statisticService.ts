import MgTestSession from "../../models/testSession.model";
import {
  IStatisticService,
  QuestionStatistic,
  TestStatistic,
} from "../interfaces/statisticService";
import {
  countTestSubmissions,
  filterTestsByTestId,
  joinSchoolIdWithSchoolDocument,
  groupResultsById,
  unwindResults,
  GroupResultsByIdResultType,
} from "../../utilities/pipelineQueryUtils";
import {
  roundTwoDecimals,
  calculateMedianScore,
} from "../../utilities/generalUtils";

class StatisticService implements IStatisticService {
  /* eslint-disable class-methods-use-this */
  async getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Map<string, TestStatistic>> {
    const pipeline = [
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
    const pipeline = [
      filterTestsByTestId(testId),
      unwindResults,
      groupResultsById("$school"),
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return this.constructTestStatisticsByGroup(aggCursor, "school");
  }

  /* eslint-disable class-methods-use-this */
  async getSubmissionCountByTest(testId: string): Promise<number> {
    const pipeline = [
      filterTestsByTestId(testId),
      unwindResults,
      countTestSubmissions,
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return aggCursor[0]?.numSubmittedTests ?? 0;
  }

  async getMeanScoreByTest(testId: string): Promise<number> {
    const pipeline = [
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
    const pipeline = [
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
