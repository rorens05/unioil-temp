import React from 'react';
import { Button } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Select, /* AutoComplete,  Cascader, DatePicker */ } from 'components/Forms';
import { customAction } from 'actions';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
};

function Register(props) {
  const {
    // values,
    // touched,
    // errors,
    // dirty,
    // handleChange,
    // handleBlur,
    // handleSubmit,
    // handleReset,
    // handleSearch,
    // setFieldValue,
    // setFieldTouched,
    isSubmitting,
    loading,
  } = props;

  return (
    <Form>
      <Field
        required
        name="email"
        label="E-mail"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="password"
        type="password"
        label="Password"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="confirm_password"
        type="password"
        label="Confirm Password"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="first_name"
        label="First Name"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="middle_name"
        label="Middle Name"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="last_name"
        type="text"
        label="Last Name"
        layout={formItemLayout}
        component={Input}
      />

      <Field
        required
        name="website"
        label="Website"
        url="/users?page=2"
        layout={formItemLayout}
        component={Select}
      />

      <Button loading={loading === 'loading' && true} style={{ display: 'block', margin: '0 auto' }} type="primary" htmlType="submit" disabled={isSubmitting}>
        Register
      </Button>
    </Form>
  )
  
};

Register = connect(
  state => ({
    loading: state.login.status
  }),
  { customAction }
)(Register);

export default Register;