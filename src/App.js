import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable';
import { connect } from "react-redux";

import LoginLayoutRoute from './components/Login/Routes';
import DashboardRoute from './components/Dashboard/Routes';
import Loading from './components/Loading';

import { getCookie } from './utils/cookie';
import { customAction } from './actions';
import { API_ENDPOINT_V1 } from "utils/Api";

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

const publicRoutes = ["/","/login","/registration","/forgot-password","/change-password"];

class App extends Component {
  state = {
    accessAuth: false,
    mounting: true
  };

  componentDidMount = async () => {
    if (getCookie('TOKEN')) {
      let { history, customAction } = this.props;
      let { replace, location } = history;

      API_ENDPOINT_V1.defaults.headers.common['Authorization'] = `Bearer ${getCookie("TOKEN").token}`;
      customAction({type: 'LOGIN_SUCCESS' });

      if(publicRoutes.includes(location.pathname)) replace("/user-management");
    }
    this.setState({ mounting: false });
  }
  

  render() {

    if(this.state.mounting) return null;

    return (
 
        <Router>
          
            <Switch>
              <Redirect exact from="/" to="/login"/>

              <LoginLayoutRoute 
                exact path="/login" 
                component={AsyncLogin} 
              />
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
              <DashboardRoute 
                path="/home-page" 
                component={AsyncPhotoSlider} 
              />
              <DashboardRoute 
                path="/promotions" 
                component={AsyncPromotions} 
              />
              <DashboardRoute 
                path="/my-profile" 
                component={AsyncMyProfile} 
              />
              <Route exact path = "/404" component = { AsyncPage404 } />
              <DashboardRoute path = "*" component = { AsyncPage404 } />
            </Switch>
          
        </Router> 
    );
  }
}

App = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  { customAction }
)(App);

export default withRouter( App);
