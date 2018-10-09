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
              <h2 style={{fontWeight: 'bold', fontSize: '16px'}}>CARD DETAILS</h2>
              <Row>
                <Col span={18} push={4}>{userInfo && userInfo.code}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Card Code:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{userInfo && userInfo.name}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Card Type:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>
                    <img 
                      src={userInfo && userInfo.image && `${process.env.REACT_APP_IMG_URL}${userInfo.image}`} 
                      alt="avatar"
                      width="300"
                      style={{maxHeight: '250px'}}
                    />
                </Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Image:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '16px'}}>DATA PRIVACY DETAILS</h2>
              <Row>
                <Col span={18} push={4}>{userInfo && userInfo.terms_and_conditions}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>{`Terms & Conditions:`}</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{userInfo && userInfo.faqs}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>FAQs:</span></Col>
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

