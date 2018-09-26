import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, InputPassword } from 'components/Forms';

function Login(props) {
  const {
    isSubmitting, 
    userVerified,
    showModalForgotUsername,
    showModalChangePassword,
    handleBlur
  } = props;

  return (
    <Form noValidate>

      <label style={{fontWeight: '500'}}>Enter Username</label>
      <Field
        name="username"
        type="text"
        icon="user"
        placeholder="User name"
        component={Input}
        // readOnly='test'
        // disabled={'test'}
        onBlur={handleBlur}
      />
      
      {
          userVerified
          ? <div style={{marginTop: '-8px'}}>
              <label style={{fontWeight: '500'}}>Password</label>
              <Field
                name="password"
                type="password"
                icon="lock"
                placeholder="Password"
                component={InputPassword}
              />
            </div>
          : null
      }
      <Row style={{marginTop: '30px'}}>
        <Col span={12} style={{marginTop: '3px'}}>
          {
            userVerified
              ? <div onClick={showModalChangePassword} style={{color: '#005598', cursor: 'pointer'}}>Forgot Password</div>
              : <div onClick={showModalForgotUsername} style={{color: '#005598', cursor: 'pointer'}}>Forgot Username</div>
          }
        </Col>
        <Col span={12}>
          <Button  
            loading={isSubmitting} 
            style={{ width: '100%', display: 'block', background: props.values.username.length > 0 ? '#E74610' : '#FCFCFC', borderColor: props.values.username.length > 0 ? '#E74610' : '#D9D9D9' }}
            type="primary" 
            htmlType="submit"
            disabled={props.values.username.length > 0 ? false : true}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  );
};


Login = connect(
  state => ({
    
  }),
)(Login);


export default Login;

