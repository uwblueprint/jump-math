import React, { type ReactElement, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";

const AddQuestionButton = (): ReactElement => {
  const history = useHistory();
  const { assessmentId } = useParams<{ assessmentId?: string }>();
  const { disableEditorPrompt } = useContext(AssessmentContext);

  return (
    <Button
      border="1px dashed"
      borderColor="grey.300"
      borderRadius="16px"
      color="grey.300"
      leftIcon={<PlusOutlineIcon />}
      onClick={() => {
        disableEditorPrompt(history.push)(
          Routes.ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE({
            assessmentId,
          }),
        );
      }}
      paddingBottom="8"
      paddingTop="8"
      width="100%"
    >
      <Text textStyle="paragraph">Add Question</Text>
    </Button>
  );
};

export default AddQuestionButton;
