import {
  FractionIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  ShortAnswerIcon,
} from "../assets/icons";

const typeToIconMetadata = {
  MULTIPLE_CHOICE: {
    icon: MultipleChoiceIcon,
    tooltip: "Select the best response from a list of options",
  },
  MULTI_SELECT: {
    icon: MultiSelectIcon,
    tooltip: "Select all correct response(s) from a list of options",
  },
  SHORT_ANSWER: {
    icon: ShortAnswerIcon,
    tooltip: "Type in your answer",
  },
  FRACTION: {
    icon: FractionIcon,
    tooltip: "Answer using proper, improper or mixed fractions",
  },
};

export default typeToIconMetadata;
