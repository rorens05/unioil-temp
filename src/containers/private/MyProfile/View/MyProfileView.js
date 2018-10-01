import React, { Component } from 'react'
import { Icon, Avatar, Row , Col } from 'antd'


import HeaderForm from "components/Forms/HeaderForm"

export default class MyProfileView extends Component {
  
  componentDidMount() {

  }

  render() {
    
    const { userInfo } = this.props;
    
    return (
      <div>
        <HeaderForm 
          title="My Profile"
        />
        <div style={{display: 'flex', alignItems: 'center', padding: '30px', background: '#F3F3F6' , border:'1px solid #E6ECF5'}} >
            <Avatar size={80} icon="user" style={{color: '#5a5e76' , backgroundColor: '#B8BBC9'}} />
            <h1 style={{margin: '0 20px', color: '#5a5e76', fontSize: '40px' }}>{userInfo && `${userInfo.firstname} ${userInfo.lastname} `}</h1>
        </div>
        <div style={{padding: '30px',  border:'1px solid #E6ECF5', borderTop: 0}}>
            <div>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>My Information</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.username}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>UserName:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}><a style={{color: '#1890FF'}} href={`mailto:${userInfo && userInfo.email}`}>loyalty.officer@unioil.com</a></Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Email:</span></Col>
              </Row>
            </div>
            <div style={{margin: '12px 0 50px'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Access Role</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.role == "1" ? "System Admin": userInfo && "Marketing Personnel" }</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Role:</span></Col>
              </Row>
            </div>
        </div>
      </div>
    )
  }
}
