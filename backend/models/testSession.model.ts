import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

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
   * a list corresponding to the question list with each element indicating
   * the student's answer, either:
   * - [numeric answer] for short answer
   * - [index] for multiple choice
   * - list of indices for multiple select
   * - [numerator, denominator] or [whole number, numerator, denominator] for fraction
   * - [] for no answer
   */
  answers: number[][][];
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   * */
  breakdown: boolean[][];
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
  answers: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  breakdown: {
    type: [Schema.Types.Mixed],
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
  /** the ID of the class that's taking the test from the Class collection */
  class: string;
  /**
   * the result of the test session
   * there should be one entry here per student
   * */
  results?: Result[];
  /** the code that students can use to access the test when it is live */
  accessCode: string;
  /** on this date, the test becomes available to students */
  startDate: Date;
  /** after this date, the test is no longer available to students */
  endDate: Date;
  /** notes inputted by teacher to show students prior to commencing the test */
  notes?: string;
}

const TestSessionSchema: Schema = new Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    results: {
      type: [ResultSchema],
      required: false,
    },
    accessCode: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<TestSession>("TestSession", TestSessionSchema);
