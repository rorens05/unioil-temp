// LIBRARIES
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import CreateSystemPreferences from './Create';
import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

// HELPER FUNCTIONS

class SystemPreferences extends Component {
  state = {
    pageRoutes: [ 
      {
        path: `${this.props.match.url}`,
        name: "System Parameters",
        component: CreateSystemPreferences,        
      },   
    ],    
  }

  componentDidUpdate() {
   
  }

  render() {  
    
    const { userInfo } = this.props
    const { pageRoutes } = this.state        

    return (

    <div style={{position: 'relative'}}>
        <MainContent pageRoutes={userInfo.data.userInfo.role == 1 ? pageRoutes : []}>
          <Switch>
            {
              userInfo.data.userInfo.role == 1 ? (
                <Fragment>
                  <Route exact path = "/system-parameters" component = { CreateSystemPreferences } />
                </Fragment>
              ) : null
            }
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}


SystemPreferences = connect(
  state => ({
    userInfo: state.login
  }),
)(SystemPreferences);


export default SystemPreferences;