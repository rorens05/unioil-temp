//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginForm from './components/LoginForm'
import { Row, Col , Modal, Button} from 'antd';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom'

import { loginSchema } from './validationSchema'

// HELPER FUNCTIONS
import { customAction } from "actions";
import { API_UNI_OIL, API_ENDPOINT_V1 } from "utils/Api";


class Login extends Component {
  state = {
    username: null,
    userVerified: false,
    isModalVisible: false,
    forgotUsername: false
  }

  handleCheckUserApi = async (values, actions) => {
   
    console.log('handleCheckUserApi',values , 'values', actions);
    const { username } = values;
    const { setErrors, setSubmitting } = actions;

    try {
      const { data } = await API_UNI_OIL.post('/login_username', {
        username
      });
      const { is_verified } = data.data;
      this.setState({ username, userVerified: is_verified });
      setSubmitting(false);
    } catch ({response: error}) {
      setErrors({ username: "Username doesn't exist"});
      setSubmitting(false);
    }
  }

  handleLoginApi = (values, actions) => {
  
    const { password, username } = values;
    const { setErrors, setSubmitting } = actions;
    //const { username } = this.state;
    let { history, location } = this.props;

    //let usernameInitialValue = location.state && location.state.username;
    //let userName = username ? username : usernameInitialValue;

    this.props.customAction({
      type: "LOGIN" ,
      payload: {
        //username : userName,
        username,
        password,
        setSubmitting,
        setErrors,
        history
      }
    });
  }

  showModalForgotUsername = () => {
    this.setState({
      isModalVisible: true,
      forgotUsername: true
    });
  }

  showModalChangePassword = () => {
    this.setState({
      isModalVisible: true,
      forgotUsername: false
    });
  }

  handleOk = () => {
    this.setState({ isModalVisible: false });
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  }

  backToLogin =(values)=> {
    values.setFieldValue('username','')
    let { history } = this.props;
    this.setState({userVerified: false})
    history.push({ pathname: '/login' });
  }

  
  render() {
    const { isAuthenticated, location } = this.props
    const { from } = this.props.location.state || { from: { pathname: "/user-management" } };    
    
    const { userVerified, isModalVisible, forgotUsername } = this.state;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    let usernameInitialValue = location.state && location.state.username;

    return (
        <Row>
          <Col span={12} offset={6}>
          
            <div>
              <img src={ require("assets/img/logo_unioil.png") } style={{margin: '60px auto 50px'}}/>
            </div>
            <div style={{marginBottom: '20px'}}>
              <h1 style={{marginBottom: 0}}>Welcome</h1>
              { !userVerified && <span style={{fontSize: '12px'}}>Sign in to continue</span> }
            </div>

            <Formik
              initialValues={{
                username: '',
                password: '', 
                remember_me: false
              }}
              enableReinitialize={true}
              validationSchema={loginSchema}
              onSubmit={userVerified ? this.handleLoginApi : this.handleCheckUserApi }
              render = {(props)=> 
                <LoginForm 
                  {...props}
                  userVerified={userVerified}
                  usernameInitialValue={usernameInitialValue}
                  showModalForgotUsername={this.showModalForgotUsername}
                  showModalChangePassword={this.showModalChangePassword}
                  backToLogin={this.backToLogin}
                />
              }
            />
          </Col>
          <Modal
            visible={isModalVisible}
            onCancel={this.handleCancel}
            width={337}
            footer={null}
          >
            <h4>Forgot {forgotUsername ? 'Username' : 'Password'}</h4>
            <p>
              To have your {forgotUsername ? 'username' : 'password reset'} , please contact <br/>
              UniOil's admin at <a href="mailto:loyalty.officer3@unioil.com" style={{color: '#005598'}}>loyalty.officer3@unioil.com</a>
            </p>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button 
                  style={{background: '#E74610', borderColor: '#E74610', width: '64px'}}
                  key="submit" type="primary" 
                  onClick={this.handleOk}
                >
                Ok
              </Button>
            </div>
          </Modal>
        </Row>
    );
  }
}

Login = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    register: state.register
  }),
  { customAction }
)(Login);

export default Login;