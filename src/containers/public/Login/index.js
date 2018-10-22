//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import LoginForm from './components/LoginForm'
import { Row, Col , Modal, Button} from 'antd';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom'

import { loginSchema } from './validationSchema'

// HELPER FUNCTIONS
import { customAction } from "actions";
import { API_UNI_OIL } from "utils/Api";


class Login extends Component {
  state = {
    username: null,
    userVerified: false,
    isModalVisible: false,
    forgotUsername: false,
    userEmail: null,
    userLogo: null,
    mounted: false,
  }

  componentDidMount = async ()=> {
    try {
      let response = await API_UNI_OIL.get('systemPreference/contact_details')
      let response_logo = await API_UNI_OIL.get('systemPreference/logo')
      
      if(response) {
        this.setState({
          userEmail: response.data.data.value,
          userLogo: response_logo.data.data.value,
          mounted: true,
        })
      }
    } catch ({response:error}) {
      
    }
  }

  handleCheckUserApi = async (values, actions) => {
   
    const { username } = values;
    const { setErrors, setSubmitting } = actions;

    try {
      const { data } = await API_UNI_OIL.post('/login_username', {
        username
      });
      const { is_verified, role } = data.data;
      this.setState({ username, userVerified: is_verified, role });
      setSubmitting(false);
    } catch ({response: error}) {
      setErrors({ username: error.data.message });
      setSubmitting(false);
    }
  }

  handleLoginApi = (values, actions) => {
  
    const { password, username } = values;
    const { setErrors, setSubmitting } = actions;
    const { role } = this.state;
    let { history, location } = this.props;

    //let usernameInitialValue = location.state && location.state.username;
    //let userName = username ? username : usernameInitialValue;

    this.props.customAction({
      type: "LOGIN" ,
      payload: {
        username,
        password,
        setSubmitting,
        setErrors,
        history,
        role
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
    if(values) {
      values.setFieldValue('username','')
      values.setFieldValue('password','')
    }
    
    let { history } = this.props;
    this.setState({userVerified: false})
    history.push({ pathname: '/login' });
  }

  
  render() {

    if(!this.state.mounted) return null;

    const { userVerified, isModalVisible, forgotUsername, role, userEmail, userLogo } = this.state;

    const { isAuthenticated, location, userInfo } = this.props
    //const { from } = this.props.location.state || { from: { pathname: "/my-profile" } }; 
    //const { from } =  { from: { pathname: role == 1 ? "/user-management" : "/my-profile" } };  
    const { from } =  { from: { pathname: "/my-profile" } };    
 
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    let usernameInitialValue = location.state && location.state.username;

    return (
        <Row>
          <Col span={12} offset={6}>
            <Helmet title = "Login Page" />
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
              To have your {forgotUsername ? 'username' : 'password reset'}, please contact <br/>
              UniOil's admin at <a href={`mailto:${userEmail && userEmail}`} style={{color: '#005598'}}>{userEmail && userEmail}</a>
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
    register: state.register,
    userInfo: state.login
  }),
  { customAction }
)(Login);

export default Login;