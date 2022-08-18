export interface QuestionStatistic {
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
  averageQuestionScores: QuestionStatistic[];
}

export interface CountryStatistic {
  country: string;
  testStatistic: TestStatistic;
}

export interface IStatisticService {
  getTestGradeStatisticsByCountry(
    testId: string,
  ): Promise<Array<CountryStatistic>>;
}
