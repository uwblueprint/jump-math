export interface StatisticsResponseDTO {
  /** the ID of the corresponding test from the Test collection */
  testId: string;
  /** the average overall test score */
  averageScore: number;
  /** the array of average test scores for each Question */
  averageScoresByQuestions: number[];
}

// TODO: uncomment - commented to please linter
// export interface IStatisticsService {}
