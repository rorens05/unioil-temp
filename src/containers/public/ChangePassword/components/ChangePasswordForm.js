import React from 'react';
import { Row, Button, Col, Popover } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { InputPassword } from 'components/Forms'

const content = (
  <div style={{fontSize: '10px'}}>
    <div>- Must be at least ten(10) character long</div>
    <div>- Must be a combination of alphanumeric character <br/>
      (letters, numbers, punctuation mark)
    </div>
    <div>- Must be a combination of uppercase and <br/> 
      lowercase letters
    </div>
  </div>
);

function ChangePasswordForm(props) {
  const {
    isSubmitting, 
  } = props;

  return (
    <Form noValidate>

      <label style={{fontWeight: '500'}}>New Password</label>
      <div style={{position: 'relative'}}>
        <Field
          name="newpassword"
          type="password"
          icon="lock"
          placeholder="New Password"
          component={InputPassword}
        />
        <div style={{position: 'absolute', top: '8px', right: '-33px' }}>
          <Popover placement="bottomRight" content={content} trigger="hover">
            <Button shape="circle" icon="info" style={{background: 'rgb(123, 121, 121)', width: '26px', height: '26px', color: 'white'}}/>
          </Popover>
        </div>
      </div>
      
      <div style={{marginTop: '-8px'}}>
        <label style={{fontWeight: '500'}}>Confirm Password</label>
        <Field
          name="confirmpassword"
          type="password"
          icon="lock"
          placeholder="Confirm Password"
          component={InputPassword}
        />
      </div>

      <Row style={{marginTop: '30px'}}>
        <Col span={12} style={{marginTop: '3px'}}></Col>
        <Col span={12}>
          <Button  
            loading={isSubmitting}
            style={{ width: '100%', display: 'block', background: '#E74610', borderColor: '#E74610' }} 
            type="primary" 
            htmlType="submit"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};


ChangePasswordForm = connect(
  state => ({
    
  }),
)(ChangePasswordForm);


export default ChangePasswordForm;

