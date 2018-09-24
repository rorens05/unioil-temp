//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PhotoSliderList from './List';
import PhotoSliderView from './View';
import PhotoSliderEdit from './Edit';
import PhotoSliderCreate from './Create';


import { PAGE404 } from "components/PageError/index"


import MainContent from 'components/Dashboard/Layout/components/MainContent';


class PhotoSlider extends Component {
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

            <Redirect exact from="/home-page" to="/home-page/photo-slider"/>
            <Route exact path = "/home-page/photo-slider" component = { PhotoSliderList } />
            <Route exact path = "/home-page/photo-slider/create" component = { PhotoSliderCreate } />
            <Route exact path = "/home-page/photo-slider/edit/:id" component = { PhotoSliderEdit } />
            <Route exact path = "/home-page/photo-slider/view/:id" component = { PhotoSliderView } />

            <PAGE404 />
          </Switch>
        </MainContent>
      </div>
    );
  }
}

export default PhotoSlider;