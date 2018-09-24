//@flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col , Alert} from 'antd';
import { Formik } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import { registrationSchema } from './validationSchema';
// import { customAction } from 'actions';
import { customAction } from '../../../actions';
import RegistrationForm from './components/RegistrationForm';


class Registration extends Component {

  render() {
    const { customAction, errors, status, isRegistered } = this.props;

    if (isRegistered) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={24} lg={12} xl={12}>
          <h1 style={{textAlign: 'center'}}>Registration</h1>
            {
              status == "error" && <Alert message={errors && errors.body} type="error" showIcon style={{marginBottom: 20}} />
            }
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirm_password: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                website: ''
              }}
              validationSchema={registrationSchema}
              onSubmit={(values, actions) => {
                customAction({type: 'REGISTRATION' , payload: {values, url: '/register'}})
                actions.setSubmitting(false);
              }}
              component={RegistrationForm}
            />
            <div style={{textAlign: 'center', marginTop: 30}}>Back to <Link to='/login'> Login</Link></div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Registration = connect(
  state => ({
    errors: state.register.messages[0],
    status: state.register.status,
    isRegistered: state.register.isRegistered,
  }),
  { customAction }
)(Registration);

export default Registration;