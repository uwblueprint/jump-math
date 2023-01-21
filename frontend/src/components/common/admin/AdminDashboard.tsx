import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import Navbar from "../Navbar";
import Page from "../../../types/PageTypes";
import * as Routes from "../../../constants/Routes";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS },
  { title: "Database", url: Routes.USER_DATABASE },
];

interface AdminDashboardProps {
  children: React.ReactElement;
}

const AdminDashboard = ({
  children,
}: AdminDashboardProps): React.ReactElement => {
  return (
    <VStack flex="1" align="left">
      <Navbar pages={pages} />
      <Box padding="1.5em 2em 0em 2em">{children}</Box>
    </VStack>
  );
};

export default AdminDashboard;
