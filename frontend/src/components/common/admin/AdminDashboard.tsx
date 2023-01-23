import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import Navbar from "../Navbar";
import Page from "../../../types/PageTypes";
import * as Routes from "../../../constants/Routes";
import AdminPage from "../../pages/AdminPage";
import CreateQuestionPage from "../../assessment-creation/CreateQuestionPage";
import PrivateRoute from "../../auth/PrivateRoute";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS },
  { title: "Database", url: Routes.USER_DATABASE },
];

const AdminDashboard = (): React.ReactElement => {
  return (
    <VStack flex="1" align="left">
      <Navbar pages={pages} />
      <Box padding="1.5em 2em 0em 2em">
        <PrivateRoute
          exact
          path={Routes.USER_DATABASE}
          component={AdminPage}
          roles={["Admin"]}
        />
        <PrivateRoute
          exact
          path={Routes.CREATE_QUESTION}
          component={CreateQuestionPage}
          roles={["Admin"]}
        />
      </Box>
    </VStack>
  );
};

export default AdminDashboard;
