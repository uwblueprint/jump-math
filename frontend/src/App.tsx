import React, { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ChakraProvider, useMediaQuery } from "@chakra-ui/react";

import EmailActionHandler from "./components/auth/email-action/EmailActionHandler";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import TeacherSignup from "./components/auth/teacher-signup";
import MobileRedirectMessage from "./components/common/info/messages/MobileRedirectMessage";
import AdminRouting from "./components/pages/admin/AdminRouting";
import ComponentLibrary from "./components/pages/ComponentLibrary";
import Landing from "./components/pages/Landing";
import NotFound from "./components/pages/NotFound";
import StudentLoginPage from "./components/pages/student/StudentLoginPage";
import StudentRouting from "./components/pages/student/StudentRouting";
import TeacherRouting from "./components/pages/teacher/TeacherRouting";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import * as Routes from "./constants/Routes";
import AuthContext from "./contexts/AuthContext";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import type { AuthenticatedUser } from "./types/AuthTypes";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import theme from "./themes";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser>(currentUser);

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  // TODO: remove sample context code from starter-code - joyce
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <ChakraProvider theme={theme}>
      <SampleContext.Provider value={sampleContext}>
        <SampleContextDispatcherContext.Provider
          value={dispatchSampleContextUpdate}
        >
          <AuthContext.Provider
            value={{
              authenticatedUser,
              setAuthenticatedUser,
            }}
          >
            <Router>
              <Switch>
                {/* for mobile devices */}
                {isMobile && (
                  <Route component={MobileRedirectMessage} exact path="*" />
                )}

                {/* private admin routing */}
                {authenticatedUser?.role === "Admin" && (
                  <Redirect
                    exact
                    from={Routes.HOME_PAGE}
                    to={Routes.ADMIN_LANDING_PAGE}
                  />
                )}
                <PrivateRoute
                  component={AdminRouting}
                  path={Routes.ADMIN_LANDING_PAGE}
                  roles={["Admin"]}
                />

                {/* private teacher routing */}
                {authenticatedUser?.role === "Teacher" && (
                  <Redirect
                    exact
                    from={Routes.HOME_PAGE}
                    to={Routes.TEACHER_LANDING_PAGE}
                  />
                )}
                <PrivateRoute
                  component={TeacherRouting}
                  path={Routes.TEACHER_LANDING_PAGE}
                  roles={["Teacher"]}
                />
                {/* private student routing */}
                {authenticatedUser?.role === "Student" && (
                  <Redirect
                    exact
                    from={Routes.HOME_PAGE}
                    to={Routes.STUDENT_LANDING_PAGE}
                  />
                )}
                <PrivateRoute
                  component={StudentRouting}
                  path={Routes.STUDENT_LANDING_PAGE}
                  roles={["Student"]}
                />

                {/* public routing */}
                <Route component={Landing} exact path={Routes.HOME_PAGE} />
                <Route component={Login} exact path={Routes.ADMIN_LOGIN_PAGE} />
                <Route
                  component={Login}
                  exact
                  path={Routes.TEACHER_LOGIN_PAGE}
                />
                <Route
                  component={TeacherSignup}
                  exact
                  path={Routes.TEACHER_SIGNUP_PAGE}
                />
                <Route
                  component={StudentLoginPage}
                  exact
                  path={Routes.STUDENT_LOGIN_PAGE}
                />
                <Route
                  component={EmailActionHandler}
                  exact
                  path={Routes.EMAIL_ACTION_PAGE}
                />

                {/* pages to remove */}
                <PrivateRoute
                  component={ComponentLibrary}
                  exact
                  path={Routes.COMPONENT_LIBRARY_PAGE}
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
