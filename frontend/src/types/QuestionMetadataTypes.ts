export interface QuestionTextMetadata {
  questionText: string;
}

export interface TextMetadata {
  text: string;
}

export interface ImageMetadata {
  previewUrl: string;
  file: File | undefined;
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
