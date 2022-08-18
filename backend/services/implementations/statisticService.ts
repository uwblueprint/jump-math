import MgTestSession, {
  GradingStatus,
  TestSession,
} from "../../models/testSession.model";
import {
  CountryStatistic,
  IStatisticService,
  QuestionStatistic,
} from "../interfaces/statisticService";

class StatisticService implements IStatisticService {
  /* eslint-disable class-methods-use-this */
  async getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Array<CountryStatistic>> {
    const pipeline = [
      // Stage 1: filter out tests that have the requested testId
      { $match: { test: { $eq: testId } } },

      // Stage 2: unwind on the results field so that there is a document for each student result
      { $unwind: "$results" },

      // Stage 3: get school documents corresponding to the school id
      {
        $lookup: {
          from: "schools",
          localField: "school",
          foreignField: "_id",
          as: "school",
        },
      },

      // Stage 4: group together documents by the school country and keep track of the
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

    return this.constructTestStatisticsByCountry(aggCursor);
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

      const averageScore = +((numCorrect * 100) / numResults).toFixed(2);
      averageScorePerQuestion.push({ averageScore });
    }

    return averageScorePerQuestion;
  }

  private constructTestStatisticsByCountry(
    aggCursor: any[],
  ): Array<CountryStatistic> {
    const testStatistics: CountryStatistic[] = [];

    aggCursor.forEach((statistic: any) => {
      testStatistics.push({
        // eslint-disable-next-line no-underscore-dangle
        country: statistic._id[0],
        testStatistic: {
          averageScore: statistic.averageScore,
          averageQuestionScores: this.getAverageScorePerQuestion(
            statistic.resultBreakdowns,
          ),
        },
      });
    });

    return testStatistics;
  }
}

export default StatisticService;
