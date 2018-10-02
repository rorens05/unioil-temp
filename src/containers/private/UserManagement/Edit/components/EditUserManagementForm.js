import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Radio } from 'components/Forms';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

function EditUserManagementForm(props) {
  const {
    isSubmitting,
    generatePassword,
    loading,
  } = props;

  return (
    <Form noValidate>

      <Field
        name="username"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="Username"
        placeholder="User name"
        component={Input}
      />

      <Field
        name="firstname"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="First Name"
        placeholder="First Name"
        component={Input}
      />

      <Field
        name="lastname"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="Last Name"
        placeholder="Last Name"
        component={Input}
      />

      <Field
        name="email"
        type="text"
        icon="mail"
        layout={formItemLayout}
        label="Email Address"
        placeholder="Email Address"
        component={Input}
      />

      <Field
        name="role"
        icon="user"
        layout={formItemLayout}
        optionsList={[
          {
            label: "System Admin",
            value: 1
          },
          {
            label: "Marketing Personnel",
            value: 2,
          }
        ]}
        label="User Role"
        component={Radio}
      />

      <Field
        name="password"
        type="text"
        icon="lock"
        loading={loading}
        withActionBtn={{
          action: ()=>generatePassword(props),
          name: "Generate"
        }}
        layout={formItemLayout}
        label="Default Password"
        component={Input}
      />

    </Form>
  );
};


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

