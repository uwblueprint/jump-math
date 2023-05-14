import React from "react";
import { Button, IconButton } from "@chakra-ui/react";

import { CheckmarkIcon } from "../../../assets/icons";
import QuestionNumberTypes from "../../../types/QuestionNumberTypes";

interface QuestionNumberProps {
  number: number;
  status: QuestionNumberTypes;
}

const QuestionNumber = ({
  number,
  status,
}: QuestionNumberProps): React.ReactElement => {
  return (
    <>
      {status === QuestionNumberTypes.COMPLETED ? (
        <IconButton
          aria-label={`Question Number ${number}`}
          fontSize="20px"
          icon={<CheckmarkIcon />}
          isActive
          minWidth="3.7rem"
          variant="primary"
        />
      ) : (
        <Button
          minWidth="3.7rem"
          variant={
            status === QuestionNumberTypes.CURRENT ? "primary" : "outline"
          }
        >
          {number}
        </Button>
      )}
    </>
  );
};

export default QuestionNumber;
