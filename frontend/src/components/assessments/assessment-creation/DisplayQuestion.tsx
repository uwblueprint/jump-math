import React, { useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../../APIClients/types/TestClientTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";

interface DisplayQuestionProps {
  questionComponents?: QuestionComponentResponse[];
}

const DisplayQuestion = ({
  questionComponents,
}: DisplayQuestionProps): React.ReactElement => {
  const [answer, setAnswer] = useState([]);
  // add type (number | number[] | null)[]

  const stackProps = {
    alignItems: "left",
    gap: "1",
    paddingRight: "4",
    paddingTop: "2",
    ml: "5",
  };

  const handleInput = (e) => setAnswer(e.target.value);

  return (
    <>
      {questionComponents.map((question, i) => {
        return (
          <Box key={i} my={10}>
            {(() => {
              switch (question.type) {
                case QuestionElementType.QUESTION_TEXT:
                  return (
                    <Text textStyle="subtitle1">
                      {question.metadata.questionText}
                    </Text>
                  );
                case QuestionElementType.TEXT:
                  return (
                    <Text textStyle="subtitle2">{question.metadata.text}</Text>
                  );
                case QuestionElementType.SHORT_ANSWER:
                  return (
                    <Input
                      borderColor="grey.300"
                      borderRadius="8px"
                      focusBorderColor="grey.300"
                      onChange={handleInput}
                      placeholder="Write your answer here"
                      value={answer}
                      variant="outline"
                      width="34%"
                    />
                  );
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <RadioGroup onChange={setAnswer} value={answer}>
                      <VStack {...stackProps}>
                        {question.metadata.options.map((option, index) => {
                          return (
                            <Radio key={index} size="lg" value={option}>
                              {option}
                            </Radio>
                          );
                        })}
                      </VStack>
                    </RadioGroup>
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <CheckboxGroup onChange={setAnswer} value={answer}>
                      <VStack {...stackProps}>
                        {question.metadata.options.map((option, index) => {
                          return (
                            <Checkbox key={index} size="lg" value={option}>
                              {option}
                            </Checkbox>
                          );
                        })}
                      </VStack>
                    </CheckboxGroup>
                  );
                default:
                  return null;
              }
            })()}
          </Box>
        );
      })}
    </>
  );
};

export default DisplayQuestion;
