import {
  FractionIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  ShortAnswerIcon,
} from "../assets/icons";

import editorTooltips from "./QuestionConstants";

const typeToIconMetadata = {
  MULTIPLE_CHOICE: {
    icon: MultipleChoiceIcon,
    alt: "multi-choice",
    tooltip: editorTooltips.MULTIPLE_CHOICE,
  },
  MULTI_SELECT: {
    icon: MultiSelectIcon,
    alt: "multi-select",
    tooltip: editorTooltips.MULTI_SELECT,
  },
  SHORT_ANSWER: {
    icon: ShortAnswerIcon,
    alt: "short-answer",
    tooltip: editorTooltips.SHORT_ANSWER,
  },
  FRACTION: {
    icon: FractionIcon,
    alt: "fraction",
    tooltip: editorTooltips.FRACTION,
  },
};

export default typeToIconMetadata;
