import mongoose, { Schema, Document } from "mongoose";

/**
 * An enum containing the grading status of a Result
 */
export enum GradingStatus {
  GRADED,
  UNGRADED,
}

/**
 * This interface holds information about the result of a single student
 * on a test
 */
export interface Result extends Document {
  /** the name of the student */
  student: string;
  /** the score of the student */
  score: number;
  /**
   * a list corresponding to the question list with each field indicating
   * the student's answer - either the numeric answer (for short answer)
   * or the option's corresponding index (for multiple choice)
   */
  answers: number[];
  /**
   * a list corresponding to the question list with each fielding indicating
   * whether the student got the question right or not
   * */
  breakdown: boolean[];
  /** the grading status of the result */
  gradingStatus: GradingStatus;
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
    type: [Number],
    required: true,
  },
  breakdown: {
    type: [Boolean],
    required: true,
  },
  gradingStatus: {
    type: String,
    required: true,
    default: GradingStatus.UNGRADED,
    enum: Object.keys(GradingStatus),
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
  gradeLevel: number;
  /**
   * the result of the test session
   * there should be one entry here per student
   * */
  results?: Result[];
  /** the code that students can use to access the test when it is live */
  accessCode: string;
  /** the time when the test session is started by teacher */
  startTime: Date;
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
    gradeLevel: {
      type: Number,
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
    startTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<TestSession>("TestSession", TestSessionSchema);
