// LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { notification, Icon } from "antd"

// COMPONENTS
import MyProfileView from './View/MyProfileView';
import MainContent from '../../../components/Dashboard/Layout/components/MainContent';
import { PAGE404 } from "components/PageError/index"

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";


class MyProfile extends Component {
  state = {
    pageRoutes: [  
    ],
    mounted: false,
    userInfo: null
  }
  
  async componentDidMount() {

    const { match } = this.props;

    API_UNI_OIL.post(`adminProfile`)        
    .then((response) => {
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    })
    .catch(({response: error}) => {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
      this.setState({ mounted: false })
    });
    
  }

  render() {       
    
    const { pageRoutes, userInfo } = this.state  

    return (
    <div style={{position: 'relative'}}>
      <MainContent pageRoutes={pageRoutes}>
        <Switch>
          <Route exact path = "/my-profile" render = {(props)=> <MyProfileView userInfo={userInfo} /> }/>
          <PAGE404 />
        </Switch>
      </MainContent>
    </div>
    );
  }
}

export default withRouter(MyProfile);