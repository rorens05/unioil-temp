import React from 'react';
import DashboardLayout from '../Layout'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


function DashboardRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route {...rest} render={props => isAuthenticated ? (
      <DashboardLayout>
        <Component {...props} />
      </DashboardLayout>
    ) : <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location, message: "You must log in to Enter this page" }
        }}
      />
    }
    />
  )
};

export default DashboardRoute = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }), 
)(DashboardRoute);


 