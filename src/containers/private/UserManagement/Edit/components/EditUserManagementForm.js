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

function EditUserManagementForm(props) {
  const {
    isSubmitting,
    generatePassword,
    loading,
    isGenerated,
    userInfo
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
        name="status"
        icon=""
        //defaultValue={}
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

      {
        userInfo.role != 1 && (
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
      )}

      <Field
        name="password"
        type="text"
        icon="lock"
        loading={loading}
        withActionBtn={{
          action: ()=>generatePassword(props),
          name: "Generate",
          disabled: userInfo.disable_generate || isGenerated
        }}
        readOnly
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

