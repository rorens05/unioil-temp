// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, Radio, UploadImage, InputTextArea } from 'components/Forms';

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

function AddCardForm(props) {
  const {
    isSubmitting,
    handleSubmit,
    loading,
    handleFileUpload
  } = props;

  return (
    <Form noValidate>

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
        imageUrl={props.values.image && `${process.env.REACT_APP_IMG_URL}/${props.values.image}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        imgWidth="294px"
        handleFileUpload={handleFileUpload}
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


AddCardForm = connect(
  state => ({
    
  }),
)(AddCardForm);


export default AddCardForm;

