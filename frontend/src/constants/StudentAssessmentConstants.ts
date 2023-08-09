import {
  FractionIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  ShortAnswerIcon,
} from "../assets/icons";

const typeToIconMetadata = {
  MULTIPLE_CHOICE: {
    icon: MultipleChoiceIcon,
    alt: "multi-choice",
    tooltip: "Select the best response from a list of options",
  },
  MULTI_SELECT: {
    icon: MultiSelectIcon,
    alt: "multi-select",
    tooltip: "Select all correct response(s) from a list of options",
  },
  SHORT_ANSWER: {
    icon: ShortAnswerIcon,
    alt: "short-answer",
    tooltip: "Type in your answer",
  },
  FRACTION: {
    icon: FractionIcon,
    alt: "fraction",
    tooltip: "Answer using proper, improper or mixed fractions",
  },
};

export default typeToIconMetadata;
