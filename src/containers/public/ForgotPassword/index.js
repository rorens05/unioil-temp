//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col , notification} from 'antd';
import { Formik, Field, Form } from 'formik'
import ForgotUsernameForm from './components/ForgotUsernameForm'
import { forgotPasswordSchema } from './validationSchema'
import { API_POST } from "utils/Api";

// HELPER FUNCTIONS
import { customAction } from "actions";


class ForgotPassword extends Component {
  state = {
    username: null
  }

  componentDidMount() {
    let { history } = this.props;
    if(history) {
      if(!history.location.state.admin_uuid) {
        return history.push({ pathname: '/login' });
      }
    }
  }

  handleLoginApi = async (values, actions) => {
  
    const { confirmpassword } = values;
    let { history } = this.props;
    let params = {
      admin_uuid: history.location.state.admin_uuid,
      password: confirmpassword
    }

    try {
      let passwordMessage = await API_POST("login_changePassword", params);

      if(passwordMessage) {
        notification.success({ message: 'Password Succesfully Updated', description: `You may now login using your new password.` });
        history.replace("/login");
      } 
    } catch (error) {
      notification.error({ message: 'Error', description: `Something went wrong changing password.` });
    }

  }


  render() {
    return (
      <Row>
          <Col span={12} offset={6}>
          
            <div>
              <img src={ require("assets/img/logo_unioil.png") } style={{margin: '60px auto 50px'}}/>
            </div>
            <div style={{marginBottom: '20px'}}>
              <h1 style={{marginBottom: 0}}>Change Password</h1>
            </div>

            <Formik
              enableReinitialize={true}
              validationSchema={forgotPasswordSchema}
              onSubmit={this.handleLoginApi}
              render = {(props)=> 
                <ForgotUsernameForm 
                  {...props}
                />
              }
            />
          </Col>
        </Row>
    )
  }
}


ForgotPassword = connect(
  state => ({
  }),
  { customAction }
)(ForgotPassword);

export default ForgotPassword;