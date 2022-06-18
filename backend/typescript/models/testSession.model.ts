import mongoose, { Schema, Document } from "mongoose";

export interface Result {
  student: string;
  score: number;
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

export interface TestSession extends Document {
  id: string;
  test: string;
  teacher: string;
  school: string;
  grade_level: number;
  results: [Result];
}

const TestSessionSchema: Schema = new Schema({
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
  results: [ResultSchema],
});

export default mongoose.model<TestSession>("TestSession", TestSessionSchema);
