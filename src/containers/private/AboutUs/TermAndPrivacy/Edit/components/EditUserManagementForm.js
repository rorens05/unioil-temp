// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, InputTextArea } from 'components/Forms';

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
    handleSubmit,
    isGenerated,
    history
  } = props;

  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Update Terms"
        action={handleSubmit}
        actionBtnName="Submit"
        withConfirm={{message: "Save changes to this record?"}}
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> { history.push("/about-us/term-privacy")}}
        cancelBtnName="Cancel"
      />
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
        rows={10}
        component={InputTextArea}
      />

    </Form>
  );
};


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

