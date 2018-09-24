//@flow
import React, { Component } from 'react';
import { Row, Col , Alert} from 'antd';
import { Formik, Field, Form } from 'formik'
import ForgotUsernameForm from './components/ForgotUsernameForm'
import { forgotPasswordSchema } from './validationSchema'



class ForgotPassword extends Component {
  state = {
    username: null
  }


  handleLoginApi = (values, actions) => {
  
    const { password } = values;
    const { setErrors, setSubmitting } = actions;
    const { token } = this.state;
    
    // this.props.customAction({
    //   type: "LOGIN" ,
    //   payload: {
    //     token, // username
    //     password,
    //     setSubmitting,
    //     setErrors
    //   }
    // });
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




export default ForgotPassword;