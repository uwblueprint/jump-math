import {
  FRACTION,
  MULTI_CHOICE,
  MULTI_SELECT,
  SHORT_ANSWER,
} from "../assets/images";

import editorTooltips from "./QuestionConstants";

const typeToImageMetadata = {
  MULTIPLE_CHOICE: {
    src: MULTI_CHOICE.src,
    alt: "multi-choice",
    tooltip: editorTooltips.MULTIPLE_CHOICE,
  },
  MULTI_SELECT: {
    src: MULTI_SELECT.src,
    alt: "multi-select",
    tooltip: editorTooltips.MULTI_SELECT,
  },
  SHORT_ANSWER: {
    src: SHORT_ANSWER.src,
    alt: "short-answer",
    tooltip: editorTooltips.SHORT_ANSWER,
  },
  FRACTION: {
    src: FRACTION.src,
    alt: "fraction",
    tooltip: editorTooltips.FRACTION,
  },
};

export default typeToImageMetadata;
