import React from 'react'
import { connect } from 'react-redux'
import { Icon, Avatar, Row , Col } from 'antd'

import HeaderForm from "components/Forms/HeaderForm"

function ViewUserManagementForm(props) {
  const {
    isSubmitting,
  } = props;

  return (
    <div>
        <div style={{padding: '15px 30px 0px', borderTop: 0}}>
            <div>
              <h2 style={{margin: '0 0 20px'}}>Details</h2>
              {/*Account Details */}
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>User Details</h2>
              <Row>
                <Col span={18} push={3}>{'jdoe'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>UserName:</span></Col>
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
                <Col span={18} push={3}><a style={{color: '#1890FF'}} href={`mailto:${'marketing.officer@unioil.com'}`}>loyalty.officer@unioil.com</a></Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Email:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Marketing Personnel'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>User Role:</span></Col>
              </Row>
            </div>
             {/*Account Details */}
            <div style={{margin: '12px 0'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px'}}>Account Details</h2>
              <Row>
                <Col span={18} push={3}>{'Active'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Status:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'20-Aug-2018'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Date Created:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Francine Narciso'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Created By:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'20-Aug-2018'}</Col>
                <Col span={3} pull={18}><span style={{fontWeight: '600'}}>Last Update:</span></Col>
              </Row>
              <Row>
                <Col span={18} push={3}>{'Francine Narciso'}</Col>
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

