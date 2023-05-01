import { FileUpload } from "graphql-upload";

/**
 * A union of all types of metadata for a question component
 */
export type BaseQuestionComponentMetadata<
  ImageMetadataType extends ImageMetadataTypes
> =
  | QuestionTextMetadata
  | TextMetadata
  | ImageMetadataType
  | MultipleChoiceMetadata
  | MultiSelectMetadata
  | ShortAnswerMetadata;

export type QuestionComponentMetadata = BaseQuestionComponentMetadata<ImageMetadata>;

export type QuestionComponentMetadataRequest = BaseQuestionComponentMetadata<ImagePreviewMetadata>;

/**
 * This interface contains the metadata for a GraphQL question component
 */
export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: ImagePreviewMetadata;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

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
  /** a temporary url to view the image */
  url: string;
}

/**
 * This interface contains additional information about an image component request
 */
export interface ImagePreviewMetadata {
  /** the file to upload */
  file: Promise<FileUpload>;
}

/** A union of all metadata types for an image component */
export type ImageMetadataTypes = ImageMetadata | ImagePreviewMetadata;

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
