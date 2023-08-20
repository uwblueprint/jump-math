import type { ResultResponseDTO } from "../services/interfaces/testSessionService";
import { roundTwoDecimals } from "./generalUtils";

const calculateMarkDistribution = (
  results: ResultResponseDTO[],
): Array<number> => {
  const markDistributionCount: Array<number> = Array(11).fill(0);

  results.forEach((result) => {
    const bucket = Math.trunc(result.score / 10);
    markDistributionCount[bucket] += 1;
  });

  return markDistributionCount.map((count) =>
    roundTwoDecimals((count / results.length) * 100),
  );
};

export default calculateMarkDistribution;
