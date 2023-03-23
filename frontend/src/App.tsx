import React, { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import EmailActionHandler from "./components/auth/email-action/EmailActionHandler";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import StudentLogin from "./components/auth/student-login/StudentLogin";
import TeacherSignup from "./components/auth/teacher-signup";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import ComponentLibrary from "./components/pages/ComponentLibrary";
import Landing from "./components/pages/Landing";
import NotFound from "./components/pages/NotFound";
import StudentAssessment from "./components/pages/student/StudentAssessment";
import TeacherPage from "./components/pages/teacher/TeacherPage";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import * as Routes from "./constants/Routes";
import AuthContext from "./contexts/AuthContext";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import { AuthenticatedUser } from "./types/AuthTypes";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import theme from "./themes";

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
                  <Redirect
                    exact
                    from={Routes.HOME_PAGE}
                    to={Routes.ADMIN_LANDING}
                  />
                )}
                <PrivateRoute
                  component={AdminDashboard}
                  path={Routes.ADMIN_LANDING}
                  roles={["Admin"]}
                />
                {authenticatedUser?.role === "Teacher" && (
                  <Redirect
                    exact
                    from={Routes.HOME_PAGE}
                    to={Routes.TEACHER_LANDING}
                  />
                )}
                <PrivateRoute
                  component={TeacherPage}
                  exact
                  path={Routes.TEACHER_LANDING}
                  roles={["Teacher"]}
                />
                <Route component={Landing} exact path={Routes.HOME_PAGE} />
                <Route component={Login} exact path={Routes.ADMIN_LOGIN} />
                <Route component={Login} exact path={Routes.TEACHER_LOGIN} />
                <Route
                  component={StudentLogin}
                  exact
                  path={Routes.STUDENT_LOGIN}
                />
                <Route
                  component={TeacherSignup}
                  exact
                  path={Routes.TEACHER_SIGNUP}
                />
                <Route
                  component={EmailActionHandler}
                  exact
                  path={Routes.EMAIL_ACTION}
                />
                <Route
                  component={StudentAssessment}
                  exact
                  path={Routes.STUDENT_ASSESMENT}
                />
                <PrivateRoute
                  component={ComponentLibrary}
                  exact
                  path={Routes.COMPONENT_LIBRARY}
                  roles={["Admin", "Teacher"]}
                />
                <Route component={NotFound} exact path="*" />
              </Switch>
            </Router>
          </AuthContext.Provider>
        </SampleContextDispatcherContext.Provider>
      </SampleContext.Provider>
    </ChakraProvider>
  );
};

export default App;
