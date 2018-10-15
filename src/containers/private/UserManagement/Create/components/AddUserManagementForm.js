// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, Radio } from 'components/Forms';

// HELPER FUNCTIONS


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

function AddUserManagementForm(props) {
  const {
    isSubmitting,
    handleSubmit,
    generatePassword,
    loading,
    isGenerated
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
        type="email"
        icon="mail"
        layout={formItemLayout}
        label="Email Address"
        placeholder="Email Address"
        component={Input}
      />

      <Field
        name="status"
        icon=""
        layout={formItemLayout}
        optionsList={[
          {
            label: "Active",
            value: "active"
          },
          {
            label: "Inactive",
            value: "inactive",
          }
        ]}
        label="Status"
        component={Radio}
      />

      <Field
        name="role"
        icon="user"
        layout={formItemLayout}
        optionsList={[
          {
            label: "System Admin",
            value: "1"
          },
          {
            label: "Marketing Personnel",
            value: "2",
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
          name: "Generate",
          disabled: isGenerated
        }}
        readOnly
        layout={formItemLayout}
        label="Default Password"
        component={Input}
      />
      
    </Form>
  );
};


AddUserManagementForm = connect(
  state => ({
    
  }),
)(AddUserManagementForm);


export default AddUserManagementForm;

