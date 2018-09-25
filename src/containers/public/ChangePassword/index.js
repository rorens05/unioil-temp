//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col , notification} from 'antd';
import { Formik, Field, Form } from 'formik'
import ChangePasswordForm from './components/ChangePasswordForm'
import { changePasswordSchema } from './validationSchema'
import { API_POST } from "utils/Api";

// HELPER FUNCTIONS
import { customAction } from "actions";


class ChangePassword extends Component {
  state = {
    username: null
  }

  componentDidMount() {
    let { history } = this.props;
    
    if(history) {
      if(!history.location.state) {
        notification.error({ message: 'Error', description: 'Login first before changing password.' });
        return history.push({ pathname: '/login' });
      } 
    }
  }
  

  handleLoginApi = async(values, actions) => {
  
    const { confirmpassword } = values;
    const { setSubmitting } = actions;
    let { history } = this.props;
    let params = {
      username: history.location.state.username,
      admin_uuid: history.location.state.admin_uuid,
      password: confirmpassword
    }

    let response = await API_POST("login_changePassword", params);

    if(response.data.code == 200) {
      notification.success({ message: 'Password Succesfully Updated', description: `You may now login using your new password.` });
      history.replace({ pathname: '/login', state: { username: params.username } });
    } else {
      notification.error({ message: 'Error Changing Password', description: response.data.data.password ? `${response.data.data.password}.` : response.data.message });
      setSubmitting(false);
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
              validationSchema={changePasswordSchema}
              onSubmit={this.handleLoginApi}
              render = {(props)=> 
                <ChangePasswordForm 
                  {...props}
                />
              }
            />
          </Col>
        </Row>
    )
  }
}


ChangePassword = connect(
  state => ({
  }),
  { customAction }
)(ChangePassword);

export default ChangePassword;