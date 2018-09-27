
import React from 'react'
import { Layout } from 'antd';

import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'
import MainSidebar from './components/MainSidebar'
 
class DashboardLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {

    const {
      children
    } = this.props
    return (
      <Layout style={{ height: '100%' }}>
        <MainSidebar collapsed={this.state.collapsed}  />
        <Layout style={{background: '#fcfcfc', paddingBottom: '10px'}}>
          <MainHeader 
            collapsed={this.state.collapsed}  
            toggle={this.toggle}
          />
            {children}
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