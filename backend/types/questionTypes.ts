import { FileUpload } from "graphql-upload";
import { ImageUpload } from "../services/interfaces/imageUploadService";
import {
  ImageTypes,
  BaseQuestionComponentMetadata,
  ImageMetadata,
  ImagePreviewMetadata,
  GraphQLQuestionComponentMetadata,
} from "./questionMetadataTypes";

/**
 * An enum containing the types of components that can be added to a question
 */
export enum QuestionComponentType {
  QUESTION_TEXT = "QUESTION_TEXT",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTI_SELECT = "MULTI_SELECT",
  SHORT_ANSWER = "SHORT_ANSWER",
}

/**
 * This interface contains information about a single component in a question
 */
export interface BaseQuestionComponent<Type extends ImageTypes> {
  /** the type of question component  */
  type: QuestionComponentType;
  /** additional metadata for the question */
  metadata: BaseQuestionComponentMetadata<Type>;
}

export type GraphQLQuestionComponent = Omit<QuestionComponent, "metadata"> &
  GraphQLQuestionComponentMetadata;

export type QuestionComponentRequest = BaseQuestionComponent<
  Promise<FileUpload>
>;

export type QuestionComponentUploaded = BaseQuestionComponent<ImageUpload>;

export type QuestionComponent = BaseQuestionComponent<ImageMetadata>;

export type QuestionComponentResponse = BaseQuestionComponent<ImagePreviewMetadata>;
