import mongoose, { Schema, Document } from "mongoose";
import { questionsValidator } from "../middlewares/validators/testValidators";
import { Grade } from "../types";
import { QuestionComponent } from "../types/questionTypes";

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
