// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import CardTypeList from './CardTypes/List';
import CardTypeCreate from './CardTypes/Create';
import CardTypeEdit from './CardTypes/Edit';
import CardTypeView from './CardTypes/View';


// import TermAndPrivacyList from './TermAndPrivacy/List';

import { PAGE404 } from "components/PageError/index"
import MainContent from 'components/Dashboard/Layout/components/MainContent';

// HELPER FUNCTIONS



class AboutUs extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}/card-types`,
        name: "Card Member",
        component: CardTypeList,        
      }, 
      {
        path: `${this.props.match.url}/card-types/create`,
        name: "Create Card Types",
        component: CardTypeCreate,
      },
      {
        path: `${this.props.match.url}/card-types/edit`,
        params: ':id',
        name: "Update Card Types",
        component: CardTypeEdit,
      },
      {
        path: `${this.props.match.url}/card-types/view`,
        params: ':id',
        name: "View Card Types",
        component: CardTypeView,
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

            <Redirect exact from="/about-us" to="/about-us/card-types"/>
            <Route exact path = "/about-us/card-types" component = { CardTypeList } />
            <Route exact path = "/about-us/card-types/create" component = { CardTypeCreate } />
            <Route exact path = "/about-us/card-types/view/:id" component = { CardTypeView } />
            <Route exact path = "/about-us/card-types/edit/:id" component = { CardTypeEdit } />

           {/*
            <Route exact path = "/about-us/terms-privacy" component = { LockAccountList } />
            <Route exact path = "/about-us/terms-privacy/create" component = { UserManagementCreate } />
            <Route exact path = "/about-us/terms-privacy/view/:id" component = { LockAccountView } />
            <Route exact path = "/about-us/terms-privacy/edit/:id" component = { UserManagementEdit } />
            */}
      

            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default AboutUs;