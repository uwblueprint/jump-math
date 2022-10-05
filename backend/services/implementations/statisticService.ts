import { Types } from "mongoose";
import MgTestSession, { GradingStatus } from "../../models/testSession.model";
import {
  IStatisticService,
  QuestionStatistic,
  TestStatistic,
} from "../interfaces/statisticService";

class StatisticService implements IStatisticService {
  /* eslint-disable class-methods-use-this */
  async getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Map<string, TestStatistic>> {
    const pipeline = [
      // Stage 1: filter out tests that have the requested testId
      { $match: { test: { $eq: Types.ObjectId(testId) } } },

      // Stage 2: filter out results that are not graded
      {
        $project: {
          results: {
            $filter: {
              input: "$results",
              as: "results",
              cond: {
                $eq: [
                  "$$results.gradingStatus",
                  GradingStatus.GRADED.toString(),
                ],
              },
            },
          },
          school: 1,
        },
      },

      // Stage 3: unwind on the results field so that there is a document for each student result
      { $unwind: "$results" },

      // Stage 4: get school documents corresponding to the school id
      {
        $lookup: {
          from: "schools",
          localField: "school",
          foreignField: "_id",
          as: "school",
        },
      },

      // Stage 5: group together documents by the school country and keep track of the
      // result breakdown array so that the average grade per question can be computed
      {
        $group: {
          _id: "$school.country",
          averageScore: { $avg: "$results.score" },
          resultBreakdowns: {
            $push: "$results.breakdown",
          },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return this.constructTestStatisticsByGroup(aggCursor, "country");
  }

  async getTestGradeStatisticsBySchool(
    testId: string,
  ): Promise<Map<string, TestStatistic>> {
    const pipeline = [
      // Stage 1: match tests that have the requested testId
      { $match: { test: { $eq: Types.ObjectId(testId) } } },

      // Stage 2: filter out results that are not graded
      {
        $project: {
          results: {
            $filter: {
              input: "$results",
              as: "results",
              cond: {
                $eq: [
                  "$$results.gradingStatus",
                  GradingStatus.GRADED.toString(),
                ],
              },
            },
          },
          school: 1,
        },
      },

      // Stage 3: unwind on the results field so that there is a document for each student result
      { $unwind: "$results" },

      // Stage 4: group together documents by the school id and keep track of the
      // result breakdown array so that the average grade per question can be computed
      {
        $group: {
          _id: "$school",
          averageScore: { $avg: "$results.score" },
          resultBreakdowns: {
            $push: "$results.breakdown",
          },
        },
      },
    ];

    const aggCursor = await MgTestSession.aggregate(pipeline);

    return this.constructTestStatisticsByGroup(aggCursor, "school");
  }

  private getAverageScorePerQuestion(
    resultBreakdowns: boolean[][],
  ): QuestionStatistic[] {
    const averageScorePerQuestion: QuestionStatistic[] = [];
    const numQuestions = resultBreakdowns[0].length;
    const numResults = resultBreakdowns.length;

    for (let i = 0; i < numQuestions; i += 1) {
      let numCorrect = 0;

      resultBreakdowns.forEach((result: boolean[]) => {
        numCorrect += result[i] ? 1 : 0;
      });

      const averageScore = (numCorrect * 100) / numResults;
      averageScorePerQuestion.push({ averageScore });
    }

    return averageScorePerQuestion;
  }

  private constructTestStatisticsByGroup(
    aggCursor: any[],
    group: string,
  ): Map<string, TestStatistic> {
    const testStatistics = new Map<string, TestStatistic>();

    aggCursor.forEach((statistic: any) => {
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
