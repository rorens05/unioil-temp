// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 
// COMPONENTS
import DashboardList from './List';
import UserManagementCreate from './Create';
import UserManagementEdit from './Edit';
import UserManagementView from './View';

import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"
 
// HELPER FUNCTIONS


class Promotions extends Component {
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
            <Route exact path = "/promotions" component = { DashboardList } />
            <Route exact path = "/promotions/create" component = { UserManagementCreate } />
            <Route exact path = "/promotions/edit/:id" component = { UserManagementEdit } />
            <Route exact path = "/promotions/view/:id" component = { UserManagementView } />
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default Promotions;