import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";
import { AdminUser } from "../../types/UserTypes";

const TeacherPage = (): React.ReactElement => {
  // starts here
  const ADMIN_USERS = gql`
    query AdminUserTable_UsersByRole($role: String!) {
      usersByRole(role: $role) {
        firstName
        lastName
        email
      }
    }
  `;

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>();

  useQuery(ADMIN_USERS, {
    fetchPolicy: "cache-and-network",
    variables: { role: "Admin" },
    onCompleted: (data) => {
      setAdminUsers(data.usersByRole);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // ends here

  return (
    <div style={{ textAlign: "center", margin: "0px auto" }}>
      <h1>Teacher Page</h1>
      <div className="btn-group">
        <Logout />
        <RefreshCredentials />
        <ResetPassword />
      </div>
    </div>
  );
};

export default TeacherPage;
