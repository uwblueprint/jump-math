import { Schema, Document, model } from "mongoose";

export interface Class extends Document {
  class_name: string;
  school_year: number;
  grade_level: string;
  teacher: string;
  test_sessions: [string];
  students: [string];
}

const ClassSchema: Schema = new Schema({
  class_name: {
    type: String,
    required: true,
  },
  school_year: {
    type: Number,
    required: true,
  },
  grade_level: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  test_sessions: {
    type: [String],
    required: true,
  },
  students: {
    type: [String],
    required: true,
  },
});

export default model<Class>("Class", ClassSchema);
