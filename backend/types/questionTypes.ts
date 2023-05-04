import {
  BaseQuestionComponentMetadata,
  GraphQLQuestionComponentMetadata,
  ImageMetadata,
  ImageMetadataRequest,
  ImageMetadataTypes,
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
  FRACTION = "FRACTION",
}

/**
 * This interface contains information about a single component in a question
 */
export interface BaseQuestionComponent<
  ImageMetadataType extends ImageMetadataTypes
> {
  /** the type of question component  */
  type: QuestionComponentType;
  /** additional metadata for the question */
  metadata: BaseQuestionComponentMetadata<ImageMetadataType>;
}

export type QuestionComponent = BaseQuestionComponent<ImageMetadata>;

export type QuestionComponentRequest = BaseQuestionComponent<ImageMetadataRequest>;

export type GraphQLQuestionComponent = Omit<QuestionComponent, "metadata"> &
  GraphQLQuestionComponentMetadata;
