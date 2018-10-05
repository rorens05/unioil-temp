
import React from 'react'
import { Layout } from 'antd';
import { notification } from "antd";

import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'
import MainSidebar from './components/MainSidebar'

import { API_UNI_OIL , API_POST } from 'utils/Api'
 
class DashboardLayout extends React.Component {
  state = {
    collapsed: false,
    userInfo: null
  };

  async componentDidMount() {
    try {
      let response = await API_POST(`adminProfile`);
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      //notification.error({ message: "Error", description: "Something went wrong your not Authenticated." , duration: 20, });
      this.setState({ mounted: false })
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {

    const { userInfo } = this.state
    const { children } = this.props
    
    return (
      <Layout style={{ height: '100%' }}>
        <MainSidebar collapsed={this.state.collapsed}  userInfo={userInfo}/>
        <Layout style={{background: '#fcfcfc', paddingBottom: '10px'}}>
          <MainHeader 
            collapsed={this.state.collapsed}  
            toggle={this.toggle}
            userInfo={userInfo}
          />
          <div style={{ overflow: 'auto', marginTop: '94px', paddingTop: '16px', position: 'relative' }}>
            {children}
          </div>
          {/* <MainFooter style={{background: '#fcfcfc'}}/> */}
        </Layout>
      </Layout>
    );
  }
}



// DashboardLayout = connect(
//   state => ({ 
//     // pull initial values from account reducer
//   }),
//   { customAction }
// )(DashboardLayout);

export default DashboardLayout