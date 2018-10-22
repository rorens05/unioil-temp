// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'
import moment from 'moment'

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
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Card Details</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.card_number}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Card Number:</span></Col>
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
              <Col span={18} push={3}>{userInfo && userInfo.birthdate}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Birthday:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.card_type}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Card Type:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Account Details</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.is_locked == 1 ? "Locked" : "Active"}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Account Status:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.reason}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Reason:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>
                    {userInfo && userInfo.lock_dt && moment(userInfo.lock_dt, 'YYYY-MM-DDTHH:mm:ss').format("DD-MMM-YYYY")}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Locked Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.unlocked_by}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Unlocked By:</span></Col>
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

