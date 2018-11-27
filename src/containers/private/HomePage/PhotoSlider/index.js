// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import PhotoSliderList from './List';
import PhotoSliderEdit from './Edit';
import PhotoSliderCreate from './Create';
import PhotoSliderView from './View';

import { PAGE404 } from "components/PageError/index"
import MainContent from 'components/Dashboard/Layout/components/MainContent';

// HELPER FUNCTIONS



class PhotoSlider extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}/photo-slider`,
        name: "Photo Slider",
        component: PhotoSliderList,        
      }, 
      {
        path: `${this.props.match.url}/photo-slider/create`,
        name: "Create Photo Slider",
        component: PhotoSliderCreate,
      },
      {
        path: `${this.props.match.url}/photo-slider/edit`,
        params: ':id',
        name: "Update Photo Slider",
        component: PhotoSliderEdit,
      },
      {
        path: `${this.props.match.url}/photo-slider/view`,
        params: ':id',
        name: "View Photo Slider",
        component: PhotoSliderView,
      },

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