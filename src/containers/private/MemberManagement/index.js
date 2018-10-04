// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import CardMemberList from './CardMember/List';
import CardMemberView from './CardMember/View';
import LockAccountList from './LockAccount/List';
import LockAccountView from './LockAccount/View';
import { PAGE404 } from "components/PageError/index"
import MainContent from 'components/Dashboard/Layout/components/MainContent';

// HELPER FUNCTIONS



class MemberManagement extends Component {
  state = {
    pageRoutes: [
      
      {
        path: `${this.props.match.url}/card-member`,
        name: "Card Member",
        component: CardMemberList,        
      }, 
      {
        path: `${this.props.match.url}/card-member/view`,
        params: ':id',
        name: "View Card Member",
        component: CardMemberView,
      },
      {
        path: `${this.props.match.url}/lock-account`,
        name: "Locked Accounts",
        component: CardMemberList,        
      }, 
      {
        path: `${this.props.match.url}/lock-account/view`,
        params: ':id',
        name: "View Locked Account",
        component: CardMemberView,
      }   
    ],    
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