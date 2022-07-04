import mongoose, { Schema, Document } from "mongoose";
import { Result } from "../types";

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
  /** the code that students can use to access the test when it is live */
  access_code: string;
  /** the time when the test session is started by teacher */
  start_time: Date;
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
    grade_level: {
      type: Number,
      required: true,
    },
    results: {
      type: [ResultSchema],
      required: true,
    },
    access_code: {
      type: String,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<TestSession>("TestSession", TestSessionSchema);
