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
        name="fee_code"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Fee Code"
        placeholder="Fee Code"
        component={Input}
      />

      <Field
        name="name"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Name"
        placeholder="Name"
        component={Input}
      />

      <Field
        name="amount"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Amount"
        placeholder="Amount"
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

