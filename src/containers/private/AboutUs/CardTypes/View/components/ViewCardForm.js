// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"

// HELPER FUNCTIONS

function ViewCardForm(props) {
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
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.code}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Card Code:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.name}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Card Type:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.description}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Short Description:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>
                    <img 
                      src={userInfo && userInfo.image && `${userInfo.image}`} 
                      alt="avatar"
                      width="300"
                      style={{maxHeight: '250px'}}
                    />
                </Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Card Type Image:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.virtual_card_font_color && userInfo.virtual_card_font_color ? "Black": "White"}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Virtual Card Font Color:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>
                    <img 
                      src={userInfo && userInfo.image && `${userInfo.bg_image}`} 
                      alt="avatar"
                      width="300"
                      style={{maxHeight: '250px'}}
                    />
                </Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Card Type Cover Image:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.id_number && userInfo.id_number ? "Yes": "No"}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>ID Number Required?:</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.id_number_description}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>ID Number Description:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '15px 0 10px'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '16px'}}>DATA PRIVACY DETAILS</h2>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.terms_and_conditions}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>{`Terms and Conditions:`}</span></Col>
              </Row>
              <Row style={styles.marginTop}>
                <Col span={18} push={5}>{userInfo && userInfo.faqs}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>FAQs:</span></Col>
              </Row>
            </div>
        </div>
      </div>
  );
};


ViewCardForm = connect(
  state => ({
    
  }),
)(ViewCardForm);


export default ViewCardForm;


const styles = {
  marginTop: {
    marginTop: '5px'
  }
}