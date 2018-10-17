// LIBRARIES
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import TopUpList from './List';
import TopUpCreate from './Create';
import TopUpEdit from './Edit';
import TopUpView from './View';
import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

// HELPER FUNCTIONS

class TopUp extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}`,
        name: "Top-Up",
        component: TopUpList,        
      },   
      {
        path: `${this.props.match.url}/create`,
        name: "Add Top-Up",
        component: TopUpCreate,
      },
      {
        path: `${this.props.match.url}/edit`,
        params: ':id',
        name: "Update Top-Up",
        component: TopUpEdit,
      },
      {
        path: `${this.props.match.url}/view`,
        params: ':id',
        name: "View Top-Up",
        component: TopUpView,
      }   
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
          {
            userInfo.data.userInfo.role == 1 
            ? 
            <Switch>
              <Route exact path = "/top-up" component = { TopUpList } />
              <Route exact path = "/top-up/create" component = { TopUpCreate } />
              <Route exact path = "/top-up/edit/:id" component = { TopUpEdit } />
              <Route exact path = "/top-up/view/:id" component = { TopUpView } />
              <PAGE404 />
            </Switch>
            : 
            <Switch>
              <PAGE404 />
            </Switch> 
          }
        </MainContent>
      </div>
    );
  }
}


TopUp = connect(
  state => ({
    userInfo: state.login
  }),
)(TopUp);

export default TopUp;