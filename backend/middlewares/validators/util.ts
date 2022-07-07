type Type = "string" | "integer" | "boolean" | "number" | "Question";

const allowableContentTypes = new Set([
  "text/plain",
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
]);

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const validatePrimitive = (value: any, type: Type): boolean => {
  if (value === undefined || value === null) return false;

  switch (type) {
    case "string": {
      return typeof value === "string";
    }
    case "boolean": {
      return typeof value === "boolean";
    }
    case "integer": {
      return typeof value === "number" && Number.isInteger(value);
    }
    case "number": {
      return typeof value === "number";
    }
    default: {
      return false;
    }
  }
};

export const validateArray = (value: any, type: Type): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    Array.isArray(value) &&
    value.every((item) => validatePrimitive(item, type))
  );
};

export const validateFileType = (mimetype: string): boolean => {
  return allowableContentTypes.has(mimetype);
};

export const getApiValidationError = (
  fieldName: string,
  type: Type,
  isArray = false,
): string => {
  return `The ${fieldName} is not a ${type}${isArray ? " Array" : ""}`;
};

export const getFileTypeValidationError = (mimetype: string): string => {
  const allowableContentTypesString = [...allowableContentTypes].join(", ");
  return `The file type ${mimetype} is not one of ${allowableContentTypesString}`;
};

export const validateMultipleChoiceQuestion = (value: any): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    validateArray(value.options, "string") &&
    validatePrimitive(value.answerIndex, "integer") &&
    value.answerIndex > 0
  );
}

export const validateNumericQuestion = (value: any): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    validatePrimitive(value.answer, "number")
  );
}

export const validateQuestionMetadata = (value: any): boolean => {
  const validateMultipleChoice = validateMultipleChoiceQuestion(value);
  const validateNumeric = validateNumericQuestion(value);

  return (validateNumeric || validateMultipleChoice) && !(validateNumeric && validateMultipleChoice);

}

export const validateQuestion = (value: any): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    validatePrimitive(value.questionType, "string") &&
    validatePrimitive(value.questionPrompt, "string") &&
    validateQuestionMetadata(value.questionMetadata)
  );
}

export const validateQuestionsArray = (value: any): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    Array.isArray(value) &&
    value.every((item) => validateQuestion(item))
  );
}