import mongoose, { Schema, Document } from "mongoose";

/**
 * An enum containing the types of questions that can be asked
 */
export enum QuestionType {
  MULTIPLE_CHOICE,
  NUMERIC_ANSWER,
}

/**
 * This interface represents a sub-document inside a Test document.
 * It contains information about a single question in a test.
 */
export interface Question {
  questionType: QuestionType;
  questionPrompt: string;
  questionMetadata: MultipleChoiceQuestion | NumericQuestion;
}

/**
 * This interface contains additional information about a multiple-choice question
 */
export interface MultipleChoiceQuestion {
  options: [string];
  answerIndex: number;
}

/**
 * This interface contains additional information about a question with a
 * numeric answer
 */
export interface NumericQuestion {
  answer: number;
}

const questionSchema = new Schema({
  questionType: {
    type: String,
    required: true,
    enum: Object.keys(QuestionType),
  },
  questionPrompt: {
    type: String,
    required: true,
  },
  questionMetadata: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

/**
 * This document contains information about a single test
 */
export interface Test extends Document {
  /** The unique identifier for the test */
  id: string;
  /** The name of the test */
  name: string;
  /** The duration of the test */
  duration: number;
  /** The administrator to which the test belongs to - this is a reference to
   * an ID in the User collection
   */
  admin: string;
  /** A list of questions to be asked when students take the test */
  questions: [Question];
}

const TestSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Test>("Test", TestSchema);
