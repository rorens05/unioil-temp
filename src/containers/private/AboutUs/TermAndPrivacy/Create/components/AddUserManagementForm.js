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
        name="title"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Title"
        placeholder="Title"
        component={Input}
      />

      <Field
        name="details"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="Details"
        placeholder="Details"
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

