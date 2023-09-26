import React, { type ReactElement } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";

const AddQuestionButton = (): ReactElement => {
  const history = useHistory();
  const { assessmentId } = useParams<{ assessmentId?: string }>();

  return (
    <Button
      border="1px dashed"
      borderColor="grey.300"
      borderRadius="16px"
      color="grey.300"
      leftIcon={<PlusOutlineIcon />}
      onClick={() =>
        history.push(
          assessmentId
            ? Routes.ASSESSMENT_EDITOR_QUESTION_CREATOR_PAGE({ assessmentId })
            : Routes.ASSESSMENT_CREATOR_QUESTION_CREATOR_PAGE,
        )
      }
      paddingBottom="8"
      paddingTop="8"
      width="100%"
    >
      <Text textStyle="paragraph">Add Question</Text>
    </Button>
  );
};

export default AddQuestionButton;
