// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, Checkbox, InputTextArea, UploadImage } from 'components/Forms';

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

function EditCardForm(props) {
  const {
    isSubmitting,
    loading,
    handleSubmit,
    handleFileUpload,
    history
  } = props;

  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Update Card Type"
        action={handleSubmit}
        actionBtnName="Submit"
        withConfirm={{message: "Save changes to this record?"}}
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> { history.push("/about-us/card-types")}}
        cancelBtnName="Cancel"
      />
      <Field
        name="code"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Card Code"
        placeholder="Card Code"
        component={Input}
      />

      <Field
        name="type"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Card Type"
        placeholder="Card Type"
        component={Input}
      />

      <Field
        name="description"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Short Description"
        placeholder="Short Description"
        rows={4}
        component={InputTextArea}
      />

      <Field
        name="image"
        type="file"
        accept=".jpg , .png, .gif"
        multiple={false}
        imageUrl={props.values.image && `${props.values.image}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        imgWidth="294px"
        handleFileUpload={handleFileUpload}
      />
      <Field
        name="id_number"
        type="check"
        icon=""
        layout={formItemLayout}
        label="ID Number Required?"
        placeholder="Is ID Number Required?"
        rows={10}
        component={Checkbox}
      />
      <Field
        name="id_number_description"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Required ID Type Description"
        placeholder="Required ID Type Description"
        rows={4}
        component={InputTextArea}
      />

      <h4 style={{marginLeft: '109px'}}>DATA PRIVACY</h4>
      <Field
        name="terms_and_conditions"
        type="text"
        icon=""
        layout={formItemLayout}
        label={`Terms & Conditions`}
        placeholder={`Terms & Conditions`}
        rows={10}
        component={InputTextArea}
      />
      <Field
        name="faqs"
        type="text"
        icon=""
        layout={formItemLayout}
        label="FAQs"
        placeholder="FAQs"
        rows={10}
        component={InputTextArea}
      />
    </Form>
  );
};


EditCardForm = connect(
  state => ({
    
  }),
)(EditCardForm);


export default EditCardForm;

