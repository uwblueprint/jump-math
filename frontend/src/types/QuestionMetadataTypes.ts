export interface QuestionTextMetadata {
  questionText: string;
}

export interface TextMetadata {
  text: string;
}

export interface ImagePreviewMetadata {
  previewUrl: string;
  file: File | undefined;
}

export type ImageMetadata = Omit<ImagePreviewMetadata, "previewUrl">;

export interface ImageMetadataResponse {
  filePath: string;
  url: string;
}

export interface ShortAnswerMetadata {
  answer: number;
}

export interface MultipleChoiceMetadata {
  options: string[];
  answerIndex: number;
}

export interface MultiSelectMetadata {
  options: string[];
  answerIndices: number[];
}
