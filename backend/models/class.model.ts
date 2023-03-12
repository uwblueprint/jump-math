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
  /** the students of the class */
  students: Student[];
}

export interface Student {
  firstName: string;
  lastName: string;
  studentNumber?: string;
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
        enum: [
          "K",
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
        ],
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
  students: {
    type: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        studentNumber: {
          type: String,
          required: false,
        },
      },
    ],
    required: false,
  },
});

export default model<Class>("Class", ClassSchema);
