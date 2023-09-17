import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../../APIClients/types/TestClientTypes";
import { formatQuestionsResponse } from "../../../../utils/QuestionUtils";
import useToast from "../../../common/info/useToast";
import PopoverButton from "../../../common/popover/PopoverButton";
import AssessmentPreview from "../../assessment-creation/AssessmentPreview";

interface PreviewButtonProps {
  assessmentId: string;
}

const PreviewButton = ({
  assessmentId,
}: PreviewButtonProps): React.ReactElement => {
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);
  const { data } = useQuery<{ test: TestResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: assessmentId },
  });
  const { showToast } = useToast();
  const questions = useMemo(() => {
    return data ? formatQuestionsResponse(data.test.questions) : [];
  }, [data]);

  return (
    <>
      {showAssessmentPreview && (
        <AssessmentPreview
          questions={questions}
          setShowAssessmentPreview={setShowAssessmentPreview}
        />
      )}

      <PopoverButton
        name="Preview"
        onClick={async () => {
          if (questions) {
            setShowAssessmentPreview(true);
          } else {
            showToast({
              message:
                "This assessment cannot be previewed at this time. Please try again.",
              status: "error",
            });
          }
        }}
      />
    </>
  );
};

export default PreviewButton;
