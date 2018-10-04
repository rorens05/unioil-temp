import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Select, DatePicker , InputTextArea, UploadImage } from 'components/Forms';

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
    handleSubmit
  } = props;

  return (
    <Form noValidate>

      <Field
        name="promotion"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Branches"
        placeholder="Promotion Name"
        mode="single"
        optionsList={[
          { label: "Gas Up Now in the Nearest Unioil Station", value: 0 },
          { label: "Up Now Gas in the Nearest Unioil Station", value: 1, },
          { label: "In the Nearest Gas Unioil Station", value: 2 }
        ]}
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
        name="upload_image"
        type="file"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        multipleFileUpload
      />


      <Field
        name="start_appeareance_date"
        type="date"
        icon=""
        layout={formItemLayout}
        label="Start Appearance Date"
        placeholder="Start Appearance Date"
        component={DatePicker}
      />

      <Field
        name="end_appeareance_date"
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

