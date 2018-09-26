import React from 'react';
import { Row, Button, Col, Icon, Avatar } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, InputPassword } from 'components/Forms';

function Login(props) {
  const {
    isSubmitting, 
    userVerified,
    showModalForgotUsername,
    showModalChangePassword,
    backToLogin
  } = props;

  return (
    <Form noValidate>

      <div style={{position: 'relative'}}>
        
        {
          !userVerified && (
            <div>
             <label style={{fontWeight: '500', color: '#005598'}}>Enter Username</label>
              <Field
              name="username"
              type="text"
              icon="user"
              placeholder="User name"
              component={Input}
              readOnly={userVerified}
            />
            </div>
          )
        }
        
        { 
          userVerified && (
          <div style={{position: 'relative' ,display: 'flex', justifyContent: 'flex-start', background: 'rgb(251, 251, 251)', border: '1px solid #d9d9d9', borderRadius: '4px', margin: '-12px 0 24px' }}>
            <Avatar icon="user" size={19} style={{margin: '7px 8px', color: '#5A5E76', fontSize: '10px' }}/>
            <div style={{margin: '5px 0', color: '#8E8E93'}}>{props.values && props.values.username}</div>
            <Icon type="close"
              style={{position: 'absolute', color: '#8E8E93', top: '4px', right: '4px', cursor: 'pointer' ,fontSize: '12px', padding: '7px'}} 
              onClick={()=>backToLogin(props)}
            />
          </div>
          ) 
        }
      </div>
      
      {
          userVerified
          ? <div style={{marginTop: '-8px'}}>
              <label style={{fontWeight: '500',  color: '#005598'}}>Enter Password</label>
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

