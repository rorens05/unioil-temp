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

class Dashboard extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}`,
        name: "User Management",
        component: DashboardList,        
      },   
      {
        path: `${this.props.match.url}/create`,
        name: "Add User",
        component: UserManagementCreate,
      },
      {
        path: `${this.props.match.url}/edit`,
        params: ':id',
        name: "Update User",
        component: UserManagementEdit,
      },
      {
        path: `${this.props.match.url}/view`,
        params: ':id',
        name: "View User",
        component: UserManagementView,
      }   
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
            <Route exact path = "/user-management" component = { DashboardList } />
            <Route exact path = "/user-management/create" component = { UserManagementCreate } />
            <Route exact path = "/user-management/edit/:id" component = { UserManagementEdit } />
            <Route exact path = "/user-management/view/:id" component = { UserManagementView } />
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default Dashboard;