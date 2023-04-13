import { FileUpload } from "graphql-upload";
import { ImageUpload } from "../services/interfaces/imageUploadService";

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
}

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
 * This interface contains additional information about an image component
 */
export interface ImageMetadata {
  filePath: string;
}

export interface ImagePreviewMetadata {
  url: string;
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

export type ImageTypes =
  | Promise<FileUpload>
  | ImagePreviewMetadata
  | ImageUpload
  | ImageMetadata;

export interface BaseQuestionComponent<Type extends ImageTypes> {
  /** the type of question component  */
  type: QuestionComponentType;
  /** additional metadata for the question */
  metadata: Exclude<QuestionComponentMetadata, ImageMetadata> | Type;
}

/**
 * This interface contains information about a single component in a question.
 */
export type QuestionComponent = BaseQuestionComponent<ImageMetadata>;

export type GenericQuestionComponent =
  | QuestionComponent
  | GraphQLQuestionComponent
  | QuestionComponentRequest
  | QuestionComponentResponse;

export type QuestionComponentRequest = BaseQuestionComponent<
  Promise<FileUpload>
>;
export type QuestionComponentResponse = BaseQuestionComponent<ImagePreviewMetadata>;
export type QuestionComponentUploaded = BaseQuestionComponent<ImageUpload>;

export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: Promise<FileUpload>;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type GraphQLQuestionComponent = Omit<QuestionComponent, "metadata"> &
  GraphQLQuestionComponentMetadata;

export type QuestionComponentMetadataRequest =
  | Exclude<QuestionComponentMetadata, ImageMetadata>
  | Promise<FileUpload>;
