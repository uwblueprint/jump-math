export interface QuestionStatistic {
  /**
   * The average score obtained by the students for a given question.
   */
  averageScore: number;
}

export interface TestStatistic {
  /**
   * The average score obtained by the students for a test.
   */
  averageScore: number;
  /**
   * A list containing the average scores for each question on the test.
   * The ordering of elements in the list corresponds with the ordering
   * of questions in the `Test` collection.
   */
  averageQuestionScores: QuestionStatistic[][];
}

export interface IStatisticService {
  /**
   * This method returns the statistics grouped by country for a given test. The
   * return value is a map with a key of the country and the value contains information
   * about the stats for the country.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Map<string, TestStatistic>>;

  /**
   * This method returns the statistics grouped by school for a given test. The
   * return value is a map with a key of the school id and the value contains information
   * about the stats for the school.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getTestGradeStatisticsBySchool(
    testId: string,
  ): Promise<Map<string, TestStatistic>>;

  /**
   * This method returns the number of submitted tests for a given test.
   * The return value is an integer that contains the number of test results.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getSubmissionCountByTest(testId: string): Promise<number>;

  /**
   * This method returns the mean score for a given test.
   * The return value is a number that contains the mean score.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getMeanScoreByTest(testId: string): Promise<number>;

  /**
   * This method returns the median score for a given test.
   * The return value is a number that contains the median score.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getMedianScoreByTest(testId: string): Promise<number>;

  /**
   * This method returns the completion rate (% of questions answered) for a given test.
   * The return value is a number that contains the completion rate.
   *
   * @param testId The unique identifier of the test to obtain statistics for
   */
  getCompletionRateByTest(testId: string): Promise<number>;
}
