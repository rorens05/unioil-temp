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
        <div style={{padding: '15px 30px 30px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              {/*Account Details */}
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.title}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Title:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.details}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Details:</span></Col>
              </Row>
              {/* <Row>
                <Col span={18} push={3}>{userInfo && userInfo.type == "1" ? "Terms" : "Privacy"}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Type:</span></Col>
              </Row> */}
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

