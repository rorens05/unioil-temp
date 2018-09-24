import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

import HeaderForm from "components/Forms/HeaderForm"

function LockAccountViewForm(props) {
  const {
    isSubmitting,
  } = props;

  return (
    <div>
        <div style={{padding: '15px 30px 0px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              {/*Account Details */}
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Card Details</h2>
              <Row>
                <Col span={18} push={3}>{'11111000000123'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Card Numbber:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'fnarciso'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>First Name:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Doe'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Last Name:</span></Col>
              </Row>
              <Row>
              <Col span={18} push={3}>{'20-Aug-2018'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Birthday:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Classic Loyalty Card'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Card Type:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Account Details</h2>
              <Row>
                <Col span={18} push={3}>{'Locked'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Account Status:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Account locked due to wrong OTP entered for 3 times during login'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Reason:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'20-Aug-2018'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Locked Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Francine Narciso'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Unlocked By:</span></Col>
              </Row>
            </div>
        </div>
      </div>
  );
};


LockAccountViewForm = connect(
  state => ({
    
  }),
)(LockAccountViewForm);


export default LockAccountViewForm;

