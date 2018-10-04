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
                <Col span={18} push={3}>{userInfo && userInfo.username}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>UserName:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.firstname}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>First Name:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.lastname}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Last Name:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}><a style={{color: '#1890FF'}} href={`mailto:${userInfo && userInfo.email}`}>{userInfo && userInfo.email}</a></Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Email:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.role == "1" ? "System Admin" : userInfo && "Marketing Personnel" }</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>User Role:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Account Details</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.status}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Status:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.created_at}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Date Created:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.created_by}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Created By:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.updated_at}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Last Update:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.updated_by}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Updated By:</span></Col>
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

