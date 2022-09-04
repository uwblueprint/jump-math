import { TestStatistic } from "../services/interfaces/statisticService";
import { mockSchoolWithId, mockSchoolWithId2 } from "./school";

const mockTestStatisticsBySchool = new Map<string, TestStatistic>([
  [
    mockSchoolWithId.id,
    {
      averageScore: 200 / 3,
      averageQuestionScores: [
        {
          averageScore: 100,
        },
        {
          averageScore: 50,
        },
        {
          averageScore: 200 / 3,
        },
        {
          averageScore: 50,
        },
      ],
    },
  ],
  [
    mockSchoolWithId2.id,
    {
      averageScore: 3800 / 56,
      averageQuestionScores: [
        {
          averageScore: 100.0,
        },
        {
          averageScore: 400 / 7,
        },
        {
          averageScore: 400 / 7,
        },
        {
          averageScore: 400 / 7,
        },
      ],
    },
  ],
]);

export default mockTestStatisticsBySchool;
