// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, Select, DatePicker , InputTextArea, UploadImage } from 'components/Forms';

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

function AddPhotoSliderForm(props) {
  const {
    isSubmitting,
    handleSubmit,
    branchesOptions,
    handleFileUpload
  } = props;

  return (
    <Form noValidate>

      <Field
        name="promotion_uuid"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Promotion Name"
        placeholder="Promotion Name"
        mode="single"
        optionsList={branchesOptions}
        component={Select}
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
        name="description"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Description"
        placeholder="Description"
        rows={6}
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


      <Field
        name="date_start"
        type="date"
        icon=""
        layout={formItemLayout}
        label="Start Appearance Date"
        placeholder="Start Appearance Date"
        component={DatePicker}
      />

      <Field
        name="date_end"
        type="date"
        icon=""
        layout={formItemLayout}
        label="End Appearance Date"
        placeholder="End Appearance Date"
        component={DatePicker}
      />

       
    </Form>
  );
};


AddPhotoSliderForm = connect(
  state => ({
    
  }),
)(AddPhotoSliderForm);


export default AddPhotoSliderForm;

