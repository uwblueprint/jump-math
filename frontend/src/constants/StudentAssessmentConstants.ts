import {
  FRACTION,
  MULTI_CHOICE,
  MULTI_SELECT,
  SHORT_ANSWER,
} from "../assets/images";

const typeToImageMetadata = {
  MULTIPLE_CHOICE: {
    src: MULTI_CHOICE.src,
    alt: "multi-choice",
    tooltip: "Select the best response from a list of options",
  },
  MULTI_SELECT: {
    src: MULTI_SELECT.src,
    alt: "multi-select",
    tooltip: "Select all correct response(s) from a list of options",
  },
  SHORT_ANSWER: {
    src: SHORT_ANSWER.src,
    alt: "short-answer",
    tooltip: "Type in your answer",
  },
  FRACTION: {
    src: FRACTION.src,
    alt: "fraction",
    tooltip: "Answer using proper, improper or mixed fractions",
  },
};

export default typeToImageMetadata;
