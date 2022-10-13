import React from "react";
import { useHistory } from "react-router-dom";
import * as Routes from "../../constants/Routes";

import Logout from "../auth/Logout";
import RefreshCredentials from "../auth/RefreshCredentials";
import ResetPassword from "../auth/ResetPassword";
import MainPageButton from "../common/MainPageButton";

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

const AdminPage = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
      <h1>Admin Page</h1>
      <div className="btn-group">
        <Logout />
        <RefreshCredentials />
        <ResetPassword />
        <Button text="Student Page" path={Routes.STUDENT_PAGE} />
        <Button text="Component Library" path={Routes.COMPONENT_LIBRARY} />
        <MainPageButton />
      </div>
    </div>
  );
};

export default AdminPage;
