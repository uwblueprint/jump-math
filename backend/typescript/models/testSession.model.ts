import mongoose, { Schema, Document } from "mongoose";

/**
 * This interface holds information about the result of a single student
 * on a test
 */
export interface Result {
  /** the name of the student */
  student: string;
  /** the score of the student */
  score: number;
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   */
  breakdown: [boolean];
}

const ResultSchema: Schema = new Schema({
  student: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  breakdown: {
    type: [Boolean],
    required: true,
  },
});

/**
 * This document contains information about a single test session
 */
export interface TestSession extends Document {
  /** the unique identifier of the test session */
  id: string;
  /** the ID of the corresponding test from the Test collection */
  test: string;
  /** the ID of the teacher administering the test from the User collection */
  teacher: string;
  /** the ID of the school that's administering the test from the School collection */
  school: string;
  /** the grade level that is being tested */
  grade_level: number;
  /**
   * the result of the test session
   * there should be one entry here per student
   * */
  results: [Result];
}

const TestSessionSchema: Schema = new Schema(
  {
    test: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    grade_level: {
      type: Number,
      required: true,
    },
    results: {
      type: [ResultSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<TestSession>("TestSession", TestSessionSchema);
