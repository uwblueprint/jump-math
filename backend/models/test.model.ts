import mongoose, { Schema, Document } from "mongoose";
import { questionsValidator } from "../middlewares/validators/testValidators";
import { Grade } from "../types";
/**
 * An enum containing the types of components that can be added to a question
 */
export enum QuestionComponentType {
  QUESTION_TEXT,
  TEXT,
  IMAGE,
  MULTIPLE_CHOICE,
  MULTI_SELECT,
  SHORT_ANSWER,
  FRACTION,
}

export enum AssessmentType {
  BEGINNING = "BEGINNING",
  END = "END",
}

export enum AssessmentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export type QuestionComponentMetadata =
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadata
  | MultipleChoiceMetadata
  | MultiSelectMetadata
  | ShortAnswerMetadata
  | FractionMetadata;

/**
 * This interface contains additional information about a question text component
 */
export interface QuestionTextMetadata {
  questionText: string;
}

/**
 * This interface contains additional information about a text component
 */
export interface TextMetadata {
  text: string;
}

/**
 * This interface contains additional information about an image component
 */
export interface ImageMetadata {
  url: string;
  filePath: string;
}

/**
 * This interface contains additional information about a multiple choice component
 */
export interface MultipleChoiceMetadata {
  /** the options for the multiple choice question */
  options: string[];
  /** the index of the options array which contains the correct answer (0-indexed) */
  answerIndex: number;
}

/**
 * This interface contains additional information about a multiple-choice component
 */
export interface MultiSelectMetadata {
  /** the options for the multiple choice question */
  options: string[];
  /** the index/indices of the options array which contains the correct answer(s) (0-indexed) */
  answerIndices: number[];
}

/**
 * This interface contains additional information about a short answer component
 */
export interface ShortAnswerMetadata {
  /** the numerical answer to the question */
  answer: number;
}

/**
 * This interface contains additional information about a fraction component
 */
export interface FractionMetadata {
  numerator: number;
  denominator: number;
}

/**
 * This interface contains information about a single component in a question.
 */
export interface QuestionComponent {
  /** the type of question component  */
  type: QuestionComponentType;
  /** additional metadata for the question */
  metadata: QuestionComponentMetadata;
}

/**
 * This document contains information about a single test
 */
export interface Test extends Document {
  /** The unique identifier for the test */
  id: string;
  /** The name of the test */
  name: string;
  /** An ordered list of questions to be asked when students take the test */
  questions: QuestionComponent[][];
  /** The intended grade the test was made for */
  grade: Grade;
  /** the type of assessment */
  assessmentType: AssessmentType;
  /** the status of the assessment */
  status: AssessmentStatus;
  /** the country that the test is to be administered in */
  curriculumCountry: string;
  /** the region that the test is to be administered in */
  curriculumRegion: string;
}

const TestSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    grade: {
      type: String,
      required: true,
      enum: Object.keys(Grade),
    },
    curriculumCountry: {
      type: String,
      required: true,
    },
    curriculumRegion: {
      type: String,
      required: true,
    },
    assessmentType: {
      type: String,
      required: true,
      enum: Object.keys(AssessmentType),
    },
    status: {
      type: String,
      required: true,
      enum: Object.keys(AssessmentStatus),
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);
TestSchema.path("questions").validate(
  questionsValidator,
  "validation of `{PATH}` failed with value `{VALUE}`",
);

export default mongoose.model<Test>("Test", TestSchema);
