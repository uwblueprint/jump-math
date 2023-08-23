import type { TestStatistic } from "../services/interfaces/statisticService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";

const mockTestStatisticsBySchool = new Map<string, TestStatistic>([
  [
    mockSchoolWithId.id,
    {
      averageScore: (66.67 + 66.67 + 33.33 + 33.33 + 83.33 + 33.33) / 6,
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
          {
            averageScore: 200 / 6,
          },
          {
            averageScore: 200 / 6,
          },
        ],
        [
          {
            averageScore: 400 / 6,
          },
        ],
      ],
    },
  ],
  [
    mockSchoolWithId2.id,
    {
      averageScore: 45.23571428571428,
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
          {
            averageScore: 100 / 7,
          },
          {
            averageScore: 300 / 7,
          },
        ],
        [
          {
            averageScore: 600 / 7,
          },
        ],
      ],
    },
  ],
]);

export default mockTestStatisticsBySchool;
