import mongoose, { Schema, Document, model } from "mongoose";

export interface Class extends Document {
  id: string;
  class_name: string;
  school_year: number;
  grade_level: string;
  teacher: string;
  test_sessions: string[];
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test_sessions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "TestSession" }],
    required: true,
  },
});

export default model<Class>("Class", ClassSchema);
