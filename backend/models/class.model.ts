import mongoose, { Schema, Document, model } from "mongoose";
import { Grade } from "../types";

/**
 * This document contains information about a single class.
 */
export interface Class extends Document {
  /** the unique identifier for the class */
  id: string;
  /** the name of the class */
  className: string;
  /** the school year of the class */
  schoolYear: number;
  /** the grade level of the class */
  gradeLevel: Grade[];
  /** the id of the teacher that teaches the class  */
  teacher: string;
  /** the ids of the test sessions assigned to the class */
  testSessions: string[];
}

const ClassSchema: Schema = new Schema({
  className: {
    type: String,
    required: true,
  },
  schoolYear: {
    type: Number,
    required: true,
  },
  gradeLevel: {
    type: [
      {
        type: String,
        required: false,
        enum: Object.keys(Grade),
      },
    ],
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  testSessions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "TestSession" }],
    required: true,
  },
});

export default model<Class>("Class", ClassSchema);
