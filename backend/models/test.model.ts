import mongoose, { Schema, Document } from "mongoose";

/**
 * An enum containing the types of components that can be added to a question
 */
export enum QuestionComponentType {
  QUESTION_TEXT,
  TEXT,
  IMAGE,
  MULTIPLE_CHOICE,
  MULTI_SELECT,
  NUMERIC_QUESTION,
}

export type QuestionComponentMetadata =
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadata
  | MultipleChoiceMetadata
  | MultiSelectMetadata
  | NumericQuestionMetadata;

export interface QuestionTextMetadata {
  text: string;
}

/**
 * This interface contains information about a text component
 */
export interface TextMetadata {
  text: string;
}

/**
 * This interface contains information about an image component
 */
export interface ImageMetadata {
  src: string;
}

/**
 * This interface contains information about a multiple-choice component
 */
export interface MultipleChoiceMetadata {
  /** the options for the multiple choice question */
  options: string[];
  /** the index of the options array which contains the correct answer (0-indexed) */
  answerIndex: number;
  points: number;
}

/**
 * This interface contains information about a multiple-choice component
 */
export interface MultiSelectMetadata {
  /** the options for the multiple choice question */
  options: string[];
  /** the index of the options array which contains the correct answer (0-indexed) */
  answerIndices: number[];
  points: number;
}

/**
 * This interface contains additional information about a question with a
 * numeric answer
 */
export interface NumericQuestionMetadata {
  /** the numerical answer to the question */
  answer: number;
}

/**
 * This interface contains information about a single question component in a question.
 */
export interface QuestionComponent {
  /** the type of question component  */
  type: QuestionComponentType;
  /** additional metadata for the question */
  metadata: QuestionComponentMetadata;
}

const QuestionComponentSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: Object.keys(QuestionComponentType),
  },
  metadata: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export interface Question {
  question: QuestionComponent[];
}

const QuestionSchema: Schema = new Schema(
  {
    question: {
      type: [QuestionComponentSchema],
      required: true,
    },
  },
  { timestamps: true },
);

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
  questions: Question[];
  /** The intended grade the test was made for */
  grade: number;
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Test>("Test", TestSchema);
