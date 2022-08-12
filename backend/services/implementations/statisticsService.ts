import { Types } from "mongoose";
import MgTestSession, { TestSession } from "../../models/testSession.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import { ISchoolService, SchoolResponseDTO } from "../interfaces/schoolService";
import {
  IStatisticsService,
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
      const statistics = await MgTestSession.aggregate([
        // Stage 1: Filter Test Session documents by test id
        {
          $match: { test: Types.ObjectId(testId) },
        },
        // Stage 2: Group remaining documents by school id and add new fields
        {
          $unwind: "$results",
        },
        {
          $group: {
            _id: "$school",
            averageScore: { $avg: "$results.score" },
            resultsBreakdownArr: {
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
        // Stage 3: Calculate the average score and the average score per question
        // {
        //     $addFields: {
        //         resultsBreakdown: {
        // $map: {
        //     input: {
        //         $zip: {
        //             inputs: "$resultsBreakdown",
        //             useLongestLength: true,
        //         },
        //     },
        //     as: "resultByQuestion",
        //     in: {
        //         $avg: {
        //             $map: {
        //                 input: "$resultByQuestion",
        //                 as: "result",
        //                 in: { $cond: ["$$result", 1, 0] }
        //             }
        //         }
        //     }
        // }
        //         },
        //     }
        // },
        // Stage 4: Sort documents by averageScore in descending order
        {
          $sort: { averageScore: -1 },
        },
      ]);

      console.log(statistics);

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

  private async mapStatisticsToStatisticsDTOs(
    testId: string,
    statistics: any[],
  ): Promise<Array<StatisticsResponseDTO>> {
    const testSessionDtos: Array<StatisticsResponseDTO> = await Promise.all(
      statistics.map(async (schoolStatistics: any) => {
        const testDTO: TestResponseDTO = await this.testService.getTestById(
          testId,
        );
        const schoolDTO: SchoolResponseDTO = await this.schoolService.getSchoolById(
          schoolStatistics.id,
        );

        return {
          test: testDTO,
          school: schoolDTO,
          averageScore: schoolStatistics.averageScore.toFixed(2),
          averageScoresByQuestions: schoolStatistics.averageScoresByQuestions,
        };
      }),
    );

    return testSessionDtos;
  }
}

export default StatisticsService;
