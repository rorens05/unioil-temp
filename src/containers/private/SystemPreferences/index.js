// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import CreateSystemPreferences from './Create';
import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

// HELPER FUNCTIONS

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
            <Route exact path = "/system-parameters" component = { CreateSystemPreferences } />
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default SystemPreferences;