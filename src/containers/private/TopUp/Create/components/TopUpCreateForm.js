// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, InputNumberAntD } from 'components/Forms';

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

function TopUpCreateForm(props) {
  const {
    isSubmitting,
    handleSubmit,
    loading,
  } = props;

  return (
    <Form noValidate>

      <Field
        name="fee_code"
        type="text"
        //icon="user"
        disabled
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
        //icon="user"
        layout={formItemLayout}
        label="Amount"
        placeholder="Amount"
        component={InputNumberAntD}
      />
      
    </Form>
  );
};


TopUpCreateForm = connect(
  state => ({
    
  }),
)(TopUpCreateForm);


export default TopUpCreateForm;

