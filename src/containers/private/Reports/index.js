// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import TopUpList from './TopUpUsageReport/List';

import StationList from './StationRatingReport/List';

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
        path: `${this.props.match.url}/station-rating`,
        name: "Station Rating Report",
        component: StationList,        
      }, 

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

            <Redirect exact from="/reports" to="/reports/station-rating"/>
            <Route exact path = "/reports/station-rating" component = { StationList } />

            {/* <Route exact path = "/reports/top-up/create" component = { TopUpCreate } />
            <Route exact path = "/reports/top-up/view/:id" component = { TopUpView } />
            <Route exact path = "/reports/top-up/edit/:id" component = { TopUpEdit } /> */}



            <PAGE404 />

          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default Reports;