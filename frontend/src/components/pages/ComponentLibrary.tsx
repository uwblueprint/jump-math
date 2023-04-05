import React from "react";

import ArchiveModal from "../assessments/assessment-status/EditStatusModals/ArchiveModal";

const ComponentLibrary = (): React.ReactElement => {
  return (
    <div>
      <ArchiveModal isOpen onClose={() => {}} />
    </div>
  );
};

export default ComponentLibrary;
