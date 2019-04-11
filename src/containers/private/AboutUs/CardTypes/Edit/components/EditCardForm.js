// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, Radio, InputTextArea, UploadImage,SingleUploadImage } from 'components/Forms';

// HELPER FUNCTIONS

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
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
    history,
    handleFileUploadBackground
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
        onCountText
        charsperpage={140}
        style={{marginBottom: '10px'}}
        name="description"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Card Type Short Description"
        placeholder="Card Type Short Description"
        rows={4}
        component={InputTextArea}
      />

       <Field
        limit100kb
        name="image"
        type="file"
        accept=".jpg , .png, .gif"
        notAcceptedImg={["image/gif"]}
        multiple={false}
        imageUrl={props.values.image && `${props.values.image}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Card Type Image"
        placeholder="Upload Card Type Image"
        component={SingleUploadImage}
        imgWidth="294px"
        handleFileUpload={handleFileUpload}
      />
      <Field
        limit100kb
        name="bg_image"
        type="file"
        multiple={false}
        notAcceptedImg={["image/gif"]}
        imageUrl={props.values.image && `${props.values.bg_image}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Card Type Cover Image"
        placeholder="Upload Card Type Cover Image"
        component={SingleUploadImage}
        imgWidth="294px"
        handleFileUpload={handleFileUploadBackground}
      />
      <Field
        name="id_number"
        icon=""
        layout={formItemLayout}
        optionsList={[
          {
            label: "Yes",
            value: 1
          },
          {
            label: "No",
            value: 2,
          }
        ]}
        label="ID Number Required?"
        component={Radio}
      />
      {/* <Field
        name="id_number_description"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Required ID Type Description"
        placeholder="Required ID Type Description"
        rows={4}
        component={InputTextArea}
      /> */}

      <h4 style={{marginLeft: '190px'}}>DATA PRIVACY</h4>
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

