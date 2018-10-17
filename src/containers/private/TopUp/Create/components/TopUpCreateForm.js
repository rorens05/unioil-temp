// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, InputNumberAntD, Radio } from 'components/Forms';

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
        label="Value"
        placeholder="Value"
        min={0}
				max={999}
				step={0.01}
        component={InputNumberAntD}
      />

      <Field
        name="type"
        icon="user"
        layout={formItemLayout}
        defaultValue={1}
        isRadioButton
        optionsList={[
          { label: "PH Peso", value: 1, },
          { label: "Percentage ", value: 2 }
        ]}
        label="Type"
        component={Radio}
      />
      
    </Form>
  );
};


TopUpCreateForm = connect(
  state => ({
    
  }),
)(TopUpCreateForm);


export default TopUpCreateForm;

