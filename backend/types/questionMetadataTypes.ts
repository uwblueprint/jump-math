import type { FileUpload } from "../lib/graphqlUpload.cjs";

/**
 * A union of all types of metadata for a question component
 */
export type BaseQuestionComponentMetadata<
  ImageMetadataType extends ImageMetadataTypes,
> =
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadataType
  | MultipleChoiceMetadata
  | MultiSelectMetadata
  | ShortAnswerMetadata
  | FractionMetadata;

export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadataRequest: ImageMetadataRequest;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
  fractionMetadata: FractionMetadata;
}

export type QuestionComponentMetadataRequest =
  BaseQuestionComponentMetadata<ImageMetadataRequest>;

export type QuestionComponentMetadata =
  BaseQuestionComponentMetadata<ImageMetadata>;

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
  /** the unique filePath to the image */
  filePath: string;
  /** a temporary url to view the image (GCP) */
  url: string;
}

/**
 * This interface contains additional information about an image component request
 */
export interface ImageMetadataRequest {
  /** the file to upload */
  file: Promise<FileUpload>;
  /** a temporary url to view the image (local or GCP) */
  previewUrl: string;
}

/** A union of all metadata types for an image component */
export type ImageMetadataTypes = ImageMetadata | ImageMetadataRequest;

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
