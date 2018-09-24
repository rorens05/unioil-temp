//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CardMemberList from './CardMember/List';
import CardMemberView from './CardMember/View';

import LockAccountList from './LockAccount/List';
import LockAccountView from './LockAccount/View';

import { PAGE404 } from "components/PageError/index"


import MainContent from 'components/Dashboard/Layout/components/MainContent';


class MemberManagement extends Component {
  state = {
    pageRoutes: [
    ]
  }


  render() {
    
    const { pageRoutes } = this.state;

    return (

      <div style={{position: 'relative'}}>
        <MainContent pageRoutes={pageRoutes}>
          <Switch>

            <Redirect exact from="/member-management" to="/member-management/card-member"/>
            <Route exact path = "/member-management/card-member" component = { CardMemberList } />
            <Route exact path = "/member-management/card-member/view/:id" component = { CardMemberView } />

          
            <Route exact path = "/member-management/lock-account" component = { LockAccountList } />
            <Route exact path = "/member-management/lock-account/view/:id" component = { LockAccountView } />
      

            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default MemberManagement;