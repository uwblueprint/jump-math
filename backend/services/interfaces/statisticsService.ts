import { SchoolResponseDTO } from "./schoolService";
import { TestResponseDTO } from "./testService";

export interface AggregateTestSessionDTO {
  /** the ID of the corresponding test from the Test collection */
  test: string;
  /** the ID of the corresponding school from the School collection */
  id: string;
  /** the average overall test score */
  averageScore: number;
  /** the array of test result breakdowns */
  resultsPerTestArr: number[][];
  /** the array of average test scores for each Question */
  averageScoresByQuestions: number[];
}

export interface StatisticsResponseDTO {
  /** the corresponding test from the Test collection */
  test: TestResponseDTO;
  /** the corresponding school from the School collection */
  school: SchoolResponseDTO;
  /** the average overall test score */
  averageScore: number;
  /** the array of average test scores for each Question */
  averageScoresByQuestions: number[];
}

export interface IStatisticsService {
  /**
   * This method calculates the average scores by school for a given test ID.
   * @param testId The unique identifier of the test to query by
   */
  getAverageScoresBySchool(
    testId: string,
  ): Promise<Array<StatisticsResponseDTO>>;
}
