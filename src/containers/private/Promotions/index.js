//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import DashboardList from './List';
import UserManagementCreate from './Create';
import UserManagementEdit from './Edit';
import UserManagementView from './View';

import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

class Dashboard extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}`,
        name: "Promotions",
        component: DashboardList,        
      },   
      {
        path: `${this.props.match.url}/create`,
        name: "Add content",
        component: UserManagementCreate,
      },
      {
        path: `${this.props.match.url}/edit`,
        params: ':id',
        name: "Edit Content",
        component: UserManagementEdit,
      },
      {
        path: `${this.props.match.url}/view`,
        params: ':id',
        name: "View",
        component: UserManagementView,
      }   
    ],    
  }

  componentDidUpdate() {
   
  }

  render() {  
    const { location } = this.props

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

export default Dashboard;