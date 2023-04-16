import { FilterQuery, Types } from "mongoose";
import { GradingStatus } from "../models/testSession.model";

export const filterTestsByTestIdQuery = (
  testId: string,
): FilterQuery<Record<string, any>> => {
  return {
    $match: { test: { $eq: Types.ObjectId(testId) } },
  };
};

export const filterUngradedTests = {
  $project: {
    results: {
      $filter: {
        input: "$results",
        as: "results",
        cond: {
          $eq: ["$$results.gradingStatus", GradingStatus.GRADED.toString()],
        },
      },
    },
    school: 1,
  },
};

export const unwindResults = {
  $unwind: "$results",
};

export const getDocumentsBySchoolId = {
  $lookup: {
    from: "schools",
    localField: "school",
    foreignField: "_id",
    as: "school",
  },
};

export const groupResultsById = (id: string) => {
  return {
    $group: {
      _id: id,
      averageScore: { $avg: "$results.score" },
      resultBreakdowns: {
        $push: "$results.breakdown",
      },
    },
  };
};

export const countTestSubmissions = {
  $count: "numSubmittedTests",
};
