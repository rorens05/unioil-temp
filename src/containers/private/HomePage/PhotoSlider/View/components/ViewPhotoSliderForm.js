// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"

// HELPER FUNCTIONS


function ViewPhotoSliderForm(props) {
  const {
    isSubmitting,
  } = props;

  return (
    <div>
        <div style={{padding: '15px 30px 0px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              {/*Account Details */}
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Content Details</h2>
              <Row>
                <Col span={18} push={4}>{'Lorem ipsum'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Title:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Description Lorem ipsum Lorem ipsum Lorem ipsum'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Description :</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Doe'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Content Type:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Schedule Details</h2>
              <Row>
                <Col span={18} push={4}>{'Active'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Start Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'20-Aug-2018'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>End Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Active'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Start Appearance Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'20-Aug-2018'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>End Appearance Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Yes'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Add in What's Hot:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Francine Narciso'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Created By:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'20-Aug-2018'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Last Update:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={4}>{'Francine Narciso'}</Col>
                <Col span={4} pull={18}><span style={{fontWeight: '600'}}>Updated By:</span></Col>
              </Row>
            </div>
        </div>
      </div>
  );
};


ViewPhotoSliderForm = connect(
  state => ({
    
  }),
)(ViewPhotoSliderForm);


export default ViewPhotoSliderForm;

