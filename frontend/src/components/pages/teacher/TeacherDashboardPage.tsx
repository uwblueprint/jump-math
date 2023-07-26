import React from "react";
import { useHistory } from "react-router-dom";

import * as Routes from "../../../constants/Routes";
import HeaderWithButton from "../../common/HeaderWithButton";
import SimplePopover from "../../common/popover/SimplePopover";

const TeacherDashboardPage = (): React.ReactElement => {
  const history = useHistory();

  return (
    <>
      <HeaderWithButton
        button={
          <SimplePopover
            items={[
              {
                name: "Assessment",
                onClick: () => history.push(Routes.DISTRIBUTE_ASSESSMENT_PAGE),
              },
              {
                name: "Classroom",
                onClick: () => history.push(Routes.CLASSROOMS_PAGE),
              },
            ]}
            text="Add New"
          />
        }
        title="Dashboard"
      />
    </>
  );
};

export default TeacherDashboardPage;
