import { Types } from "mongoose";
import MgTestSession from "../../models/testSession.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { ISchoolService, SchoolResponseDTO } from "../interfaces/schoolService";
import {
  IStatisticsService,
  AggregateTestSessionDTO,
  StatisticsBySchoolDTO,
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
  ): Promise<Array<StatisticsBySchoolDTO>> {
    let statisticsBySchoolDtos: Array<StatisticsBySchoolDTO> = [];

    try {
      const statisticsBySchool: AggregateTestSessionDTO[] = await MgTestSession.aggregate(
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
              resultBreakdowns: {
                $push: "$results.breakdown",
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
      statisticsBySchool.forEach((school: AggregateTestSessionDTO) => {
        school.averageScoresByQuestions = this.computeAverageScorePerQuestion(
          school.resultBreakdowns,
        );
      });

      statisticsBySchoolDtos = await this.mapStatisticsToStatisticsDTOs(
        testId,
        statisticsBySchool,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get average scores by school. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }

    return statisticsBySchoolDtos;
  }

  private computeAverageScorePerQuestion(
    resultBreakdowns: boolean[][],
  ): number[] {
    const averageScorePerQuestion: number[] = [];
    const numOfQuestions = resultBreakdowns[0].length;
    const numOfResults = resultBreakdowns.length;

    for (let i = 0; i < numOfQuestions; i += 1) {
      let scoresSum = 0;

      resultBreakdowns.forEach((result: boolean[]) => {
        scoresSum += result[i] ? 1 : 0;
      });

      const averageScore = +((scoresSum * 100) / numOfResults).toFixed(2);
      averageScorePerQuestion.push(averageScore);
    }

    return averageScorePerQuestion;
  }

  private async mapStatisticsToStatisticsDTOs(
    testId: string,
    statistics: AggregateTestSessionDTO[],
  ): Promise<Array<StatisticsBySchoolDTO>> {
    const statisticsDtos: Array<StatisticsBySchoolDTO> = await Promise.all(
      statistics.map(async (schoolStatistics: AggregateTestSessionDTO) => {
        const schoolDTO: SchoolResponseDTO = await this.schoolService.getSchoolById(
          schoolStatistics.id,
        );

        return {
          test: testId,
          school: schoolDTO,
          averageScore: +schoolStatistics.averageScore.toFixed(2),
          averageScoresByQuestions: schoolStatistics.averageScoresByQuestions,
        };
      }),
    );

    return statisticsDtos;
  }
}

export default StatisticsService;
