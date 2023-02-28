import { Schema, Document, model } from "mongoose";

export interface Class extends Document {
  class_name: string;
  school_year: number;
  grade_level: string;
  teacher: string;
  test_sessions: [string];
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
  },
});

export default model<Class>("Class", ClassSchema);
