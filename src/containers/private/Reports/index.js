// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import TopUpList from './TopUpUsageReport/List';
import TopUpCreate from './TopUpUsageReport/Create';
import TopUpEdit from './TopUpUsageReport/Edit';
import TopUpView from './TopUpUsageReport/View';

import { PAGE404 } from "components/PageError/index"
import MainContent from 'components/Dashboard/Layout/components/MainContent';

// HELPER FUNCTIONS



class Reports extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}/top-up`,
        name: "Top-Up Usage Report",
        component: TopUpList,        
      }, 
      {
        path: `${this.props.match.url}/top-up/create`,
        name: "Create Top-Up Usage Report",
        component: TopUpCreate,
      },
      {
        path: `${this.props.match.url}/top-up/edit`,
        params: ':id',
        name: "Update Top-Up Usage Report",
        component: TopUpEdit,
      },
      {
        path: `${this.props.match.url}/top-up/view`,
        params: ':id',
        name: "View Top-Up Usage Report",
        component: TopUpView,
      }  


      // {
      //   path: `${this.props.match.url}/lock-account`,
      //   name: "Locked Accounts",
      //   component: CardMemberList,        
      // }, 
      // {
      //   path: `${this.props.match.url}/lock-account/view`,
      //   params: ':id',
      //   name: "View Locked Account",
      //   component: CardMemberView,
      // }   
    ],    
  }


  render() {
    
    const { pageRoutes } = this.state;
    
    return (

      <div style={{position: 'relative'}}>
        <MainContent pageRoutes={pageRoutes}>
          <Switch>

            <Redirect exact from="/reports" to="/reports/top-up"/>
            <Route exact path = "/reports/top-up" component = { TopUpList } />
            <Route exact path = "/reports/top-up/create" component = { TopUpCreate } />
            <Route exact path = "/reports/top-up/view/:id" component = { TopUpView } />
            <Route exact path = "/reports/top-up/edit/:id" component = { TopUpEdit } />

           {/*
            <Route exact path = "/reports/terms-privacy" component = { LockAccountList } />
            <Route exact path = "/reports/terms-privacy/create" component = { UserManagementCreate } />
            <Route exact path = "/reports/terms-privacy/view/:id" component = { LockAccountView } />
            <Route exact path = "/reports/terms-privacy/edit/:id" component = { UserManagementEdit } />
            */}
      

            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default Reports;