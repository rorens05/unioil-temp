// LIBRARIES
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'
import moment from 'moment'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"

// HELPER FUNCTIONS


function ViewPhotoSliderForm(props) {
  const {
    isSubmitting,
    userInfo
  } = props;

  return (
    <div>
        <div style={{ width: '100%', height: '160px' }}>
          {
            userInfo && (
              <img
              style={{ float:'left', width:'313px', height:'174px', objectFit: 'fill'}}
              src={`${userInfo.image}` }
            />
            )
          }
        </div>
        <div style={{padding: '15px 30px 0px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              <h2 style={{fontWeight: 'bold', fontSize: '15px'}}>CONTENT DETAILS</h2>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.title}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Title:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.description}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Description:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '15px'}}>SCHEDULE DETAILS</h2>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.date_start && moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format("DD-MMM-YYYY")}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Start Appeareance Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.date_end && moment(userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss').format("DD-MMM-YYYY")}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>End Appeareance Date:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.date_start && moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss')}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Start Time:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.date_end && moment(userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss')}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>End Time:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.created_by}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Created By:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.created_at && moment(userInfo.created_at, 'YYYY-MM-DDTHH:mm:ss').format("DD-MMM-YYYY")}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Date Created:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.updated_by}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Last Updated By:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={5}>{userInfo && userInfo.updated_at && moment(userInfo.updated_at, 'YYYY-MM-DDTHH:mm:ss').format("DD-MMM-YYYY")}</Col>
                <Col span={5} pull={18}><span style={{fontWeight: '600'}}>Last Date Updated:</span></Col>
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

