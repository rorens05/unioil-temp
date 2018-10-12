// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"

// HELPER FUNCTIONS

function ViewUserManagementForm(props) {
  const {
    isSubmitting,
    userInfo
  } = props;

  return (
    <div>
        <div style={{padding: '15px 30px 0px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              {/*Account Details */}
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>User Details</h2>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Username:</span></Col>
                <Col span={20}>{userInfo && userInfo.username}</Col>
               
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>User Role:</span></Col>
                <Col span={20}>{userInfo && userInfo.role == "1" ? "System Admin" : userInfo && "Marketing Personnel" }</Col>
                
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>First Name:</span></Col>
                <Col span={20}>{userInfo && userInfo.firstname}</Col>
                
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Last Name:</span></Col>
                <Col span={20}>{userInfo && userInfo.lastname}</Col>
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Email Address:</span></Col>
                <Col span={20}><a style={{color: '#1890FF'}} href={`mailto:${userInfo && userInfo.email}`}>{userInfo && userInfo.email}</a></Col>
              </Row>
              
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Account Details</h2>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Status:</span></Col>
                <Col span={20}>{userInfo && userInfo.status}</Col>
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Created By:</span></Col>
                <Col span={20}>{userInfo && userInfo.created_by}</Col>
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Created Date:</span></Col>
                <Col span={20}>{userInfo && userInfo.created_at}</Col>
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Last Updated by:</span></Col>
                <Col span={20}>{userInfo && userInfo.updated_by}</Col>
              </Row>
              <Row>
                <Col span={4}><span style={{fontWeight: '600'}}>Last Updated date:</span></Col>
                <Col span={20}>{userInfo && userInfo.updated_at}</Col>
              </Row>
            </div>
        </div>
      </div>
  );
};


ViewUserManagementForm = connect(
  state => ({
    
  }),
)(ViewUserManagementForm);


export default ViewUserManagementForm;

