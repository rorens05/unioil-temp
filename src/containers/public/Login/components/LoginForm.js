import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, InputPassword } from 'components/Forms';
import { isEmpty } from "utils/helper";

function Login(props) {
  const {
    isSubmitting, 
    userVerified,
    usernameInitialValue,
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
        onBlur={handleBlur}
      />
      
      {
          userVerified || usernameInitialValue
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
            userVerified || usernameInitialValue
              ? <div onClick={showModalChangePassword} style={{color: '#005598', cursor: 'pointer'}}>Forgot Password</div>
              : <div onClick={showModalForgotUsername} style={{color: '#005598', cursor: 'pointer'}}>Forgot Username</div>
          }
        </Col>
        <Col span={12}>
          <Button  
            loading={isSubmitting} 
            style={{ width: '100%', display: 'block', background: props.values.username.length > 0 ? '#E74610' : '#FCFCFC', borderColor: props.values.username.length > 0 ? '#E74610' : '#D9D9D9' }} 
            //style={{ width: '100%', display: 'block', background: '#E74610', borderColor: '#E74610' }} 
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

