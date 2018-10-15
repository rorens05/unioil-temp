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

function EditUserManagementForm(props) {
  const {
    isSubmitting,
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
        defaultValue={props.values.amount}
        layout={formItemLayout}
        label="Amount"
        placeholder="Amount"
        component={InputNumberAntD}
      />

      <Field
        name="type"
        icon="user"
        layout={formItemLayout}
        defaultValue={props.values.type}
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


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

