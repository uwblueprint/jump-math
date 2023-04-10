import React from "react";

import QuestionNumberTypes from "../../types/QuestionNumberTypes";
import QuestionNumber from "../assessments/assessment-creation/QuestionNumber";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <QuestionNumber num={1} status={QuestionNumberTypes.CURRENT} />
    </div>
  );
};

export default ComponentLibrary;
