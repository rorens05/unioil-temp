import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MyProfileView from './View/MyProfileView';
import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

class MyProfile extends Component {
  state = {
    pageRoutes: [  
    ],    
  }

  componentDidUpdate() {
   
  }

  render() {       
    
    const { pageRoutes } = this.state  

    return (
    <div style={{position: 'relative'}}>
      <MainContent pageRoutes={pageRoutes}>
        <Switch>
          <Route exact path = "/my-profile" component = { MyProfileView } />
          <PAGE404 />
        </Switch>
      </MainContent>
    </div>
    );
  }
}

export default MyProfile;