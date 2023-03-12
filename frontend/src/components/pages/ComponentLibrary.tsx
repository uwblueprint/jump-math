import React from "react";
import QuestionCard from "../assessments/assessment-creation/QuestionCard";
import { QuestionType } from "../../types/QuestionTypes";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <QuestionCard
        tags={[
          { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
          { type: QuestionType.SHORT_ANSWER, count: 1 },
          { type: QuestionType.MULTI_SELECT, count: 1 },
        ]}
        questionNum={1}
        points={5}
        questions={[
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
        ]}
      />
    </div>
  );
};

export default ComponentLibrary;
