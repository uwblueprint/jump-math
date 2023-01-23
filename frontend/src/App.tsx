import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/pages/NotFound";

import StudentPage from "./components/pages/StudentPage";
import AdminPage from "./components/pages/AdminPage";
import TeacherPage from "./components/pages/TeacherPage";

import * as Routes from "./constants/Routes";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";

import { AuthenticatedUser } from "./types/AuthTypes";

import Landing from "./components/pages/Landing";

import theme from "./themes";
import CreateQuestionPage from "./components/assessment-creation/CreateQuestionPage";
import TeacherSignup from "./components/auth/TeacherSignup";
import EmailActionHandler from "./components/auth/EmailAction/EmailActionHandler";
import AdminDashboard from "./components/common/admin/AdminDashboard";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  // TODO: remove sample context code from starter-code - joyce
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  return (
    <ChakraProvider theme={theme}>
      <SampleContext.Provider value={sampleContext}>
        <SampleContextDispatcherContext.Provider
          value={dispatchSampleContextUpdate}
        >
          <AuthContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
          >
            <Router>
              <Switch>
                {authenticatedUser?.role === "Admin" && (
                  <Redirect exact from={Routes.HOME_PAGE} to={Routes.ADMIN} />
                )}
                <PrivateRoute
                  path={Routes.ADMIN}
                  component={AdminDashboard}
                  roles={["Admin"]}
                />
                <Route exact path={Routes.HOME_PAGE} component={Landing} />
                <Route exact path={Routes.ADMIN_LOGIN} component={Login} />
                <Route exact path={Routes.TEACHER_LOGIN} component={Login} />
                <Route
                  exact
                  path={Routes.TEACHER_SIGNUP}
                  component={TeacherSignup}
                />
                <Route
                  exact
                  path={Routes.EMAIL_ACTION}
                  component={EmailActionHandler}
                />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </Router>
          </AuthContext.Provider>
        </SampleContextDispatcherContext.Provider>
      </SampleContext.Provider>
    </ChakraProvider>
  );
};

export default App;
