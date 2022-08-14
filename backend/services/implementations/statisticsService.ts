import { Types } from "mongoose";
import MgTestSession from "../../models/testSession.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { ISchoolService, SchoolResponseDTO } from "../interfaces/schoolService";
import {
  IStatisticsService,
  AggregateTestSessionDTO,
  StatisticsResponseDTO,
} from "../interfaces/statisticsService";
import { ITestService, TestResponseDTO } from "../interfaces/testService";
import { ITestSessionService } from "../interfaces/testSessionService";
import IUserService from "../interfaces/userService";

const Logger = logger(__filename);

class StatisticsService implements IStatisticsService {
  /* eslint-disable class-methods-use-this */
  testSessionService: ITestSessionService;

  testService: ITestService;

  userService: IUserService;

  schoolService: ISchoolService;

  constructor(
    testSessionService: ITestSessionService,
    testService: ITestService,
    userService: IUserService,
    schoolService: ISchoolService,
  ) {
    this.testSessionService = testSessionService;
    this.testService = testService;
    this.userService = userService;
    this.schoolService = schoolService;
  }

  async getAverageScoresBySchool(
    testId: string,
  ): Promise<Array<StatisticsResponseDTO>> {
    let statisticsDTOs: Array<StatisticsResponseDTO> = [];

    try {
      const statistics: AggregateTestSessionDTO[] = await MgTestSession.aggregate(
        [
          // Stage 1: Filter Test Session documents by test id
          {
            $match: { test: Types.ObjectId(testId) },
          },
          // Stage 2: Group remaining documents by school id and add aggregate fields
          {
            $unwind: "$results",
          },
          {
            $group: {
              _id: "$school",
              averageScore: { $avg: "$results.score" },
              resultsPerTestArr: {
                $push: {
                  $map: {
                    input: "$results.breakdown",
                    as: "result",
                    in: { $cond: ["$$result", 1, 0] },
                  },
                },
              },
            },
          },
          // Stage 3: Sort documents by averageScore in descending order
          {
            $sort: { averageScore: -1 },
          },
        ],
      );

      /* eslint-disable no-param-reassign */
      statistics.forEach((statistic: AggregateTestSessionDTO) => {
        statistic.averageScoresByQuestions = this.computeAverageScorePerQuestion(
          statistic.resultsPerTestArr,
        );
      });

      statisticsDTOs = await this.mapStatisticsToStatisticsDTOs(
        testId,
        statistics,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get average scores by school. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return statisticsDTOs;
  }

  private computeAverageScorePerQuestion(
    resultsPerTestArr: number[][],
  ): number[] {
    const averageResultsPerQuestion: number[] = [];
    const numOfQuestions = resultsPerTestArr[0].length;
    const numOfResults = resultsPerTestArr.length;

    for (let i = 0; i < numOfQuestions; i += 1) {
      let scoresSum = 0;

      resultsPerTestArr.forEach((test: number[]) => {
        scoresSum += test[i];
      });

      const averageScore = +((scoresSum * 100) / numOfResults).toFixed(2);
      averageResultsPerQuestion.push(averageScore);
    }

    return averageResultsPerQuestion;
  }

  private async mapStatisticsToStatisticsDTOs(
    testId: string,
    statistics: AggregateTestSessionDTO[],
  ): Promise<Array<StatisticsResponseDTO>> {
    const testSessionDtos: Array<StatisticsResponseDTO> = await Promise.all(
      statistics.map(async (schoolStatistics: AggregateTestSessionDTO) => {
        const testDTO: TestResponseDTO = await this.testService.getTestById(
          testId,
        );
        const schoolDTO: SchoolResponseDTO = await this.schoolService.getSchoolById(
          schoolStatistics.id,
        );

        return {
          test: testDTO,
          school: schoolDTO,
          averageScore: +schoolStatistics.averageScore.toFixed(2),
          averageScoresByQuestions: schoolStatistics.averageScoresByQuestions,
        };
      }),
    );

    return testSessionDtos;
  }
}

export default StatisticsService;
