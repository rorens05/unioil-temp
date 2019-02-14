
import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Content, Sider } = Layout;


function LoginLayout({children, ...rest}) {
  return (
    <Layout style={{height: "100%"}}>
      <Sider width='50%' style={{ background: `url(${require("assets/img/bg_cms.png")}) center`, backgroundSize: 'cover' } }></Sider>
      <Layout>
        <Content style={{padding: 16}} >{children}</Content>
        <Footer style={{textAlign: 'center', fontSize: '12px'}}>
          <div style={{margin: '25px auto', padding: '17px 0', width: '325px', borderTop: '1px solid #e0e0e0', textAlign: 'left', color: '#8E8E93' }}>
            By logging in you agree to Unioil's Terms of Service, <br/>Privacy Policy and Content Policies.
          </div>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LoginLayout