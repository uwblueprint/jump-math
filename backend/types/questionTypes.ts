import { FileUpload } from "graphql-upload";
import {
  ImageMetadata,
  MultiSelectMetadata,
  MultipleChoiceMetadata,
  QuestionComponent,
  QuestionComponentMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../models/test.model";
import { ImageUpload } from "../services/interfaces/imageUploadService";

export interface ImagePreviewMetadata {
  url: string;
}

export interface GraphQLQuestionComponentMetadata {
  questionTextMetadata: QuestionTextMetadata;
  textMetadata: TextMetadata;
  imageMetadata: Promise<FileUpload>;
  multipleChoiceMetadata: MultipleChoiceMetadata;
  multiSelectMetadata: MultiSelectMetadata;
  shortAnswerMetadata: ShortAnswerMetadata;
}

export type QuestionComponentMetadataRequest =
  | Exclude<QuestionComponentMetadata, ImageMetadata>
  | Promise<FileUpload>;

export type GraphQLQuestionComponent = Omit<QuestionComponent, "metadata"> &
  GraphQLQuestionComponentMetadata;

export type QuestionComponentRequest = Omit<QuestionComponent, "metadata"> & {
  metadata: QuestionComponentMetadataRequest;
};

export type QuestionComponentResponse = Omit<QuestionComponent, "metadata"> & {
  metadata:
    | Exclude<QuestionComponentMetadata, ImageMetadata>
    | ImagePreviewMetadata;
};

export type QuestionComponentsUploaded = Omit<QuestionComponent, "metadata"> & {
  metadata: Exclude<QuestionComponentMetadata, ImageMetadata> | ImageUpload;
};
