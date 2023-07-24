import React from "react";
import { Divider, Input, VStack } from "@chakra-ui/react";

import { stringToNumberArray } from "../../../../utils/StudentUtils";
import {
  getDividerWidth,
  getFractionInputWidth,
} from "../../../admin/question-creation/question-elements/modals/fraction/FractionModal";

import useAnswerState from "./useAnswerState";

interface FractionProps {
  answerElementIndex: number;
}

const Fraction = ({
  answerElementIndex,
}: FractionProps): React.ReactElement => {
  const { currentAnswer, updateAnswer } = useAnswerState(answerElementIndex);
  const numeratorWidth = getFractionInputWidth(String(currentAnswer[0] ?? ""));
  const denominatorWidth = getFractionInputWidth(
    String(currentAnswer[1] ?? ""),
  );

  return (
    <VStack
      alignItems="center"
      border="1px solid #636363"
      borderRadius={8}
      px={8}
      py={4}
    >
      <Input
        border="2px solid #636363"
        borderRadius={2}
        ml={1}
        onChange={(e) =>
          updateAnswer(
            stringToNumberArray(e.target.value).concat(currentAnswer[1]),
          )
        }
        textAlign="center"
        type="number"
        value={currentAnswer[0] ?? ""}
        width={`${numeratorWidth}px`}
      />
      <Divider
        borderBottomWidth="2px"
        borderColor="grey.300"
        w={`${getDividerWidth(numeratorWidth, denominatorWidth)}px`}
      />
      <Input
        border="2px solid #636363"
        borderRadius={2}
        ml={1}
        onChange={(e) =>
          updateAnswer(
            [currentAnswer[0]].concat(stringToNumberArray(e.target.value)),
          )
        }
        textAlign="center"
        type="number"
        value={currentAnswer[1] ?? ""}
        width={`${denominatorWidth}px`}
      />
    </VStack>
  );
};

export default Fraction;
