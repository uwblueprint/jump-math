import React from "react";

import PopoverButton from "../../../common/popover/PopoverButton";

interface PreviewButtonProps {
  assessmentId: string;
}

const PreviewButton = ({
  assessmentId,
}: PreviewButtonProps): React.ReactElement => {
  return <PopoverButton name="Preview" onClick={() => console.log("here")} />;
};

export default PreviewButton;
