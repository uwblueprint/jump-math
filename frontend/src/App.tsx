import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import Default from "./components/pages/Default";
import NotFound from "./components/pages/NotFound";

import StudentPage from "./components/pages/StudentPage";
import AdminPage from "./components/pages/AdminPage";
import TeacherPage from "./components/pages/TeacherPage";

import ComponentLibrary from "./components/pages/ComponentLibrary";

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
                <Route exact path={Routes.LOGIN_PAGE} component={Login} />
                <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />

                {/* TODO, change to private routes after user management setup */}
                <PrivateRoute
                  exact
                  path={Routes.HOME_PAGE}
                  component={Default}
                />

                <PrivateRoute
                  exact
                  path={Routes.STUDENT_PAGE}
                  component={StudentPage}
                />
                <PrivateRoute
                  exact
                  path={Routes.TEACHER_PAGE}
                  component={TeacherPage}
                />
                <PrivateRoute
                  exact
                  path={Routes.ADMIN_PAGE}
                  component={AdminPage}
                />

                <PrivateRoute
                  exact
                  path={Routes.COMPONENT_LIBRARY}
                  component={ComponentLibrary}
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
