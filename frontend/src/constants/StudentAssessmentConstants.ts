import { MULTI_CHOICE, MULTI_SELECT, SHORT_ANSWER } from "../assets/images";

const typeToImageMetadata = {
  MULTIPLE_CHOICE: {
    src: MULTI_CHOICE.src,
    alt: "multi-choice",
    tooltip:
      "Users will have to select the best response from a list of options",
  },
  MULTI_SELECT: {
    src: MULTI_SELECT.src,
    alt: "multi-select",
    tooltip:
      "Users will have to select the correct responses from a list of options",
  },
  SHORT_ANSWER: {
    src: SHORT_ANSWER.src,
    alt: "short-answer",
    tooltip: "Users will have to type in their answers",
  },
};

export default typeToImageMetadata;
