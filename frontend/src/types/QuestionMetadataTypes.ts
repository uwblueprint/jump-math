export interface QuestionTextMetadata {
  questionText: string;
}

export interface TextMetadata {
  text: string;
}

export interface ImageMetadataRequest {
  previewUrl: string;
  file: File | undefined;
}

export interface ImageMetadata {
  filePath: string | undefined;
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

export interface FractionMetadata {
  numerator: number;
  denominator: number;
}
