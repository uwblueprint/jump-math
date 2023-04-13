import { FileUpload } from "graphql-upload";
import { ImageUpload } from "../services/interfaces/imageUploadService";

/**
 * A union of all types of metadata for a question component
 */
export type QuestionComponentMetadata =
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadata
  | MultipleChoiceMetadata
  | MultiSelectMetadata
  | ShortAnswerMetadata;

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
 * These interfaces contains additional information about an image component
 */
export interface ImageMetadata {
  /** the unique filePath to the image */
  filePath: string;
}

export interface ImagePreviewMetadata {
  /** a temporary url to view the image */
  url: string;
}

/**
 * A union of all image metadata types for a question component
 */
export type ImageTypes =
  | Promise<FileUpload> /** image file in Test request */
  | ImagePreviewMetadata /** image url in Test response */
  | ImageUpload /** image filePath and url after upload */
  | ImageMetadata; /** image filePath stored in database */

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
 * This interface contains information about the metadata for a single question component
 */
export type BaseQuestionComponentMetadata<Type extends ImageTypes> =
  | Exclude<QuestionComponentMetadata, ImageMetadata>
  | Type;

export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: Promise<FileUpload>;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type QuestionComponentMetadataRequest = BaseQuestionComponentMetadata<
  Promise<FileUpload>
>;
