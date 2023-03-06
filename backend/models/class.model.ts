import mongoose, { Schema, Document, model } from "mongoose";
import { Grade } from "../types";

export interface Class extends Document {
  id: string;
  className: string;
  schoolYear: number;
  gradeLevel: Grade[];
  teacher: string;
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
});

export default model<Class>("Class", ClassSchema);
