import React from "react";

import { QuestionElementType } from "../../types/QuestionTypes";
import QuestionCard from "../assessments/assessment-creation/QuestionCard";
import ArchiveModal from "../assessments/assessment-status/EditStatusModals/ArchiveModal";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <QuestionCard
        questionNumber={1}
        questions={[
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley.",
          "Thomas has 3 apples, 4 apples and 7 pears. Thomas also has 3 other friends, Andrian, Mariah, and Carley, who like to eat apples.",
        ]}
        tags={[
          { type: QuestionElementType.MULTIPLE_CHOICE, count: 2 },
          { type: QuestionElementType.SHORT_ANSWER, count: 1 },
          { type: QuestionElementType.MULTI_SELECT, count: 1 },
        ]}
      />
      <ArchiveModal isOpen onClose={() => {}} />
    </div>
  );
};

export default ComponentLibrary;
