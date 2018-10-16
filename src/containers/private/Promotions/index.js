// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 
// COMPONENTS
import PromotionsList from './List';
import PromotionsCreate from './Create';
import PromotionsEdit from './Edit';
import PromotionsView from './View';

import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"
 
// HELPER FUNCTIONS


class Promotions extends Component {
  state = {
    pageRoutes: [ 
      {
        path: `${this.props.match.url}`,
        name: "Promotions",
        component: PromotionsList,        
      },   
      {
        path: `${this.props.match.url}/create`,
        name: "Add Content",
        component: PromotionsCreate,
      },
      {
        path: `${this.props.match.url}/edit`,
        params: ':id',
        name: "Update Promotions",
        component: PromotionsEdit,
      },
      {
        path: `${this.props.match.url}/view`,
        params: ':id',
        name: "View Promotions",
        component: PromotionsView,
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
            <Route exact path = "/promotions" component = { PromotionsList } />
            <Route exact path = "/promotions/create" component = { PromotionsCreate } />
            <Route exact path = "/promotions/edit/:id" component = { PromotionsEdit } />
            <Route exact path = "/promotions/view/:id" component = { PromotionsView } />
            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default Promotions;