//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import CreateSystemPreferences from './Create';

import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

class SystemPreferences extends Component {
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
            <Route exact path = "/system-preferences" component = { CreateSystemPreferences } />
            {/* <Route exact path = "/system-preferences/create" component = { UserManagementCreate } />
            <Route exact path = "/system-preferences/edit/:id" component = { UserManagementEdit } />
            <Route exact path = "/system-preferences/view/:id" component = { UserManagementView } /> */}
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default SystemPreferences;