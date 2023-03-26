import React from "react";

import { QuestionType } from "../../types/QuestionTypes";
import QuestionCard from "../assessments/assessment-creation/QuestionCard";
import ArchiveModal from "../assessments/EditStatusModals/ArchiveModal";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <QuestionCard
        points={5}
        questionNum={1}
        questions={[
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
        ]}
        tags={[
          { type: QuestionType.MULTIPLE_CHOICE, count: 2 },
          { type: QuestionType.SHORT_ANSWER, count: 1 },
          { type: QuestionType.MULTI_SELECT, count: 1 },
        ]}
      />
      <ArchiveModal isOpen onClose={() => {}} />
    </div>
  );
};

export default ComponentLibrary;
