import { FilterQuery, Types } from "mongoose";
import { Result } from "../models/testSession.model";

export type GroupResultsByIdResultType = {
  _id: string;
  averageScore: number;
  resultBreakdowns: Result["breakdown"][];
};

type GroupResultsByIdReturnType = {
  $group: {
    _id: string;
    averageScore: { $avg: string };
    resultBreakdowns: { $push: string };
  };
};

// Filter out tests that have the requested testId
export const filterTestsByTestId = (
  testId: string,
): FilterQuery<Record<string, unknown>> => {
  return {
    $match: { test: { $eq: Types.ObjectId(testId) } },
  };
};

// Unwind on the results field so that there is a document for each student result
export const unwindResults = {
  $unwind: "$results",
};

// Get school documents corresponding to the school id
export const joinSchoolIdWithSchoolDocument = {
  $lookup: {
    from: "schools",
    localField: "school",
    foreignField: "_id",
    as: "school",
  },
};

// Group together documents by an id and keep track of the
// result breakdown array so that the average grade per question can be computed
export const groupResultsById = (id: string): GroupResultsByIdReturnType => {
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

// Stores the number of graded tests in "numSubmittedTests" field
export const countTestSubmissions = {
  $count: "numSubmittedTests",
};
