import React from "react";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";

const TeacherPage = (): React.ReactElement => {
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
