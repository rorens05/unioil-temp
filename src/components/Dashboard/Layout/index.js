
import React from 'react'
import { Layout } from 'antd';
import { notification } from "antd";
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer'

import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'
import MainSidebar from './components/MainSidebar'

import { API_UNI_OIL , API_POST } from 'utils/Api'
import { customAction } from 'actions'

class DashboardLayout extends React.Component {
  

  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onActive = this.handleActive.bind(this)
    this.onIdle = this.handleIdle.bind(this)

    this.state = {
      collapsed: false,
      userInfo: null,
      updatedLogo: null
    };
  }

  componentWillReceiveProps(nexProps, prevProps) {
    if(nexProps && nexProps.systemPreferences) {
      if(nexProps.systemPreferences.data && nexProps.systemPreferences.data) {
        this.setState({
          updatedLogo: nexProps.systemPreferences.data.logo
        })
      }
    }
  }

  componentDidUpdate(nexProps) {
    
  }

  handleActive(e) {
    // console.log('user is active', e)
  }
 
  handleIdle(e) {
    // console.log('user is idle', e)
    notification.error({ 
      message: "Error", 
      description: <div>You are logout automatically for being idle more than 10 minutes.</div>, 
      duration: 0, 
      key: 'idle-notification-1'
    });
    this.props.customAction({type: 'LOGOUT'});
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {

    //const { userInfo } = this.state
    const { children, userInfo } = this.props

    return (
      <Layout style={{ height: '100%' }}>
        <MainSidebar collapsed={this.state.collapsed}  userInfo={userInfo.data.userInfo} systemPreferences={this.state.updatedLogo}/>
        <Layout style={{background: '#fcfcfc', paddingBottom: '10px'}}>
          <MainHeader
            collapsed={this.state.collapsed}
            toggle={this.toggle}
            userInfo={userInfo.data.userInfo}
          />
            <div style={{ overflow: 'auto', marginTop: '94px', paddingTop: '16px', position: 'relative' }}>
            <IdleTimer
              ref={ref => { this.idleTimer = ref }}
              element={document}
              onActive={this.onActive}
              onIdle={this.onIdle}
              timeout={600000}
            >
                {children}
            </IdleTimer>
          </div>
        </Layout>
      </Layout>
    );
  }
}



DashboardLayout = connect(
  state => ({
    // pull initial values from account reducer
    userInfo: state.login,
    systemPreferences: state.systemPreferences
  }),
  { customAction }
)(DashboardLayout);

export default DashboardLayout