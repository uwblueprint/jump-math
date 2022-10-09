import React from "react";
import { useHistory } from "react-router-dom";
import * as Routes from "../../constants/Routes";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";

type ButtonProps = { text: string; path: string };

const Button = ({ text, path }: ButtonProps) => {
  const history = useHistory();
  const navigateTo = () => history.push(path);
  return (
    <button className="btn btn-primary" onClick={navigateTo} type="button">
      {text}
    </button>
  );
};

const Default = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h1>Default Page</h1>
      <div className="btn-group" style={{ paddingRight: "10px" }}>
        <Logout />
        <RefreshCredentials />
        <ResetPassword />
        <Button text="Student Page" path={Routes.STUDENT_PAGE} />
        <Button text="Teacher Page" path={Routes.TEACHER_PAGE} />
        <Button text="Admin Page" path={Routes.ADMIN_PAGE} />
        <Button text="Component Library" path={Routes.COMPONENT_LIBRARY} />
      </div>
      <div style={{ height: "2rem" }} />
    </div>
  );
};

export default Default;
