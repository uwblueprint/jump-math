import React from "react";
import ForgotPassword from "../auth/ForgotPassword";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";

const TeacherPage = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", margin: "0px auto" }}>
      <h1>Teacher Page</h1>
      <div className="btn-group">
        <Logout />
        <RefreshCredentials />
        <ForgotPassword />
      </div>
    </div>
  );
};

export default TeacherPage;
