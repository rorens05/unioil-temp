import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import LoginLayoutRoute from "./components/Login/Routes";
import DashboardRoute from "./components/Dashboard/Routes";
import Loading from "./components/Loading";

import { getCookie } from "./utils/cookie";
import { customAction } from "./actions";
import { API_UNI_OIL, API_POST } from "utils/Api";

const AsyncLogin = Loadable({
  loader: () => import("./containers/public/Login"),
  loading: Loading
});

const AsyncRegistration = Loadable({
  loader: () => import("./containers/public/Registration"),
  loading: Loading
});

const AsyncChangePassword = Loadable({
  loader: () => import("./containers/public/ChangePassword"),
  loading: Loading
});

const AsyncPublicTopSuccessPage = Loadable({
  loader: () => import("./containers/public/PublicTopSuccessPage"),
  loading: () => {
    return null;
  }
});

const AsyncPublicTopErrorPage = Loadable({
  loader: () => import("./containers/public/PublicTopErrorPage"),
  loading: () => {
    return null;
  }
});

const AsyncMyProfile = Loadable({
  loader: () => import("./containers/private/MyProfile"),
  loading: Loading
});

const AsyncUserManagement = Loadable({
  loader: () => import("./containers/private/UserManagement"),
  loading: Loading
});

const AsyncMemberManagement = Loadable({
  loader: () => import("./containers/private/MemberManagement"),
  loading: Loading
});

const AsyncPhotoSlider = Loadable({
  loader: () => import("./containers/private/HomePage/PhotoSlider"),
  loading: Loading
});

const AsyncPromotions = Loadable({
  loader: () => import("./containers/private/Promotions"),
  loading: Loading
});

const AsyncTopUp = Loadable({
  loader: () => import("./containers/private/TopUp"),
  loading: Loading
});

const AsyncCardTypes = Loadable({
  loader: () => import("./containers/private/AboutUs"),
  loading: Loading
});

const AsyncReports = Loadable({
  loader: () => import("./containers/private/Reports"),
  loading: Loading
});

const AsyncSystemPreferences = Loadable({
  loader: () => import("./containers/private/SystemPreferences"),
  loading: Loading
});

const AsyncPage404 = Loadable({
  loader: () => import("./components/PageError/404"),
  loading: Loading
});

const CaptureRouteNotFound = withRouter(({ children, location }) => {
  return location && location.state && location.state.pageNotFound ? (
    <AsyncPage404 />
  ) : (
    children
  );
});

const publicRoutes = [
  "/",
  "/login",
  "/registration",
  "/forgot-password",
  "/change-password",
  "/topup-success-page",
  "/topup-error-page"
];

class App extends Component {
  state = {
    accessAuth: false,
    mounting: true
  };

  componentDidMount = async () => {
    if (getCookie("TOKEN")) {
      let { history, customAction } = this.props;
      let { replace, location } = history;

      API_UNI_OIL.defaults.headers.common["Authorization"] = `Bearer ${
        getCookie("TOKEN").token
      }`;
      //customAction({type: 'LOGIN_SUCCESS' });

      try {
        let response = await API_POST(`adminProfile`);
        response.data.data["userInfo"] = { ...response.data.data };

        customAction({
          type: "LOGIN_SUCCESS",
          payload: { ...response.data.data }
        });
      } catch ({ response: error }) {
        //notification.error({ message: "Error", description: "Something went wrong loading user data." , duration: 20, });
      }

      if (publicRoutes.includes(location.pathname)) replace("/user-management");
    }
    this.setState({ mounting: false });
  };

  render() {
    console.log("====================================");
    console.log(
      process.env.REACT_APP_API,
      process.env.REACT_APP_IMG_URL,
      process.env.REACT_APP_PUBLIC,
      "API LIST!!!"
    );
    console.log("====================================");
    if (this.state.mounting) return null;

    if (process.env.REACT_APP_PUBLIC === "false") {
      return (
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login" />

            <LoginLayoutRoute exact path="/login" component={AsyncLogin} />
            <LoginLayoutRoute
              exact
              path="/registration"
              component={AsyncRegistration}
            />

            <LoginLayoutRoute
              exact
              path="/change-password"
              component={AsyncChangePassword}
            />

            {/* PRIVATE ROUTES */}
            <DashboardRoute
              path="/user-management"
              component={AsyncUserManagement}
            />
            <DashboardRoute
              path="/member-management"
              component={AsyncMemberManagement}
            />
            <DashboardRoute path="/home-page" component={AsyncPhotoSlider} />
            <DashboardRoute path="/promotions" component={AsyncPromotions} />
            <DashboardRoute path="/top-up" component={AsyncTopUp} />
            <DashboardRoute path="/about-us" component={AsyncCardTypes} />
            <DashboardRoute path="/reports" component={AsyncReports} />
            <DashboardRoute
              path="/system-parameters"
              component={AsyncSystemPreferences}
            />
            <DashboardRoute path="/my-profile" component={AsyncMyProfile} />
            <Route
              exact
              path="/topup-success-page"
              component={AsyncPublicTopSuccessPage}
            />
            <Route
              exact
              path="/topup-error-page"
              component={AsyncPublicTopErrorPage}
            />
            <Route exact path="/404" component={AsyncPage404} />
            <DashboardRoute path="*" component={AsyncPage404} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Redirect exact from="/" to="/topup-success-page" />
            <Redirect exact from="/login" to="/topup-success-page" />
            <Route
              exact
              path="/topup-success-page"
              component={AsyncPublicTopSuccessPage}
            />
            <Route
              exact
              path="/topup-error-page"
              component={AsyncPublicTopErrorPage}
            />
            <Route exact path="/404" component={AsyncPage404} />
            <DashboardRoute path="*" component={AsyncPage404} />
          </Switch>
        </Router>
      );
    }
  }
}

App = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  { customAction }
)(App);

export default withRouter(App);
