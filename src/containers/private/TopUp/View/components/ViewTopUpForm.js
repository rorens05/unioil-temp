// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"

// HELPER FUNCTIONS


function ViewTopUpForm(props) {
  const {
    isSubmitting,
    userInfo
  } = props;

  return (
    <div>
        <div style={{padding: '15px 30px 30px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.fee_code}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Fee Code:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.name}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Name:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{userInfo && userInfo.amount}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Amount:</span></Col>
              </Row>
            </div>
        </div>
      </div>
  );
};


ViewTopUpForm = connect(
  state => ({
    
  }),
)(ViewTopUpForm);


export default ViewTopUpForm;

