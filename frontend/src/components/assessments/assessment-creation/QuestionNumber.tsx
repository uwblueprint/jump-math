import React from "react";
import { Button, IconButton } from "@chakra-ui/react";

import { CheckmarkIcon } from "../../../assets/icons";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";

interface QuestionNumberProps {
  num: number;
  status: QuestionNumberTypes;
}

const QuestionNumber = ({
  num,
  status,
}: QuestionNumberProps): React.ReactElement => {
  return (
    <>
      {status === QuestionNumberTypes.COMPLETED ? (
        <IconButton
          aria-label={`Question Number ${num}`}
          icon={<CheckmarkIcon />}
          isDisabled
          minWidth="4%"
          variant="primary"
        />
      ) : (
        <Button
          minWidth="4%"
          variant={
            status === QuestionNumberTypes.CURRENT ? "primary" : "outline"
          }
        >
          {num}
        </Button>
      )}
    </>
  );
};

export default QuestionNumber;
