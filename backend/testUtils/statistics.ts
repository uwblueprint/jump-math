import { TestStatistic } from "../services/interfaces/statisticService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";

const mockTestStatisticsBySchool = new Map<string, TestStatistic>([
  [
    mockSchoolWithId.id,
    {
      averageScore: 250 / 4,
      averageQuestionScores: [
        [
          {
            averageScore: 300 / 6,
          },
          {
            averageScore: 300 / 6,
          },
          {
            averageScore: 500 / 6,
          },
        ],
        [
          {
            averageScore: 400 / 6,
          },
        ],
        [],
      ],
    },
  ],
  [
    mockSchoolWithId2.id,
    {
      averageScore: 375 / 7,
      averageQuestionScores: [
        [
          {
            averageScore: 200 / 7,
          },
          {
            averageScore: 200 / 7,
          },
          {
            averageScore: 500 / 7,
          },
        ],
        [
          {
            averageScore: 600 / 7,
          },
        ],
        [],
      ],
    },
  ],
]);

export default mockTestStatisticsBySchool;
