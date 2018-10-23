// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import { Input, Select, DatePicker , InputTextArea, UploadImage, TimePickerForm } from 'components/Forms';

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
    promotionsOptions,
    handleFileUpload,
    handleGetDate,
    photoSliderLimit,
    dateStartEnd
  } = props;

  return (
    <Form noValidate>

      <Field
        name="promotion_uuid"
        type="select"
        icon=""
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="Promotion Name"
        placeholder="Promotion Name"
        mode="single"
        optionsList={promotionsOptions}
        handleGetDate={handleGetDate}
        component={Select}
      />

      <Field
        name="title"
        type="text"
        icon=""
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="Title"
        placeholder="Title"
        component={Input}
      />

      <Field
        name="description"
        type="text"
        icon=""
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="Description"
        placeholder="Description"
        rows={6}
        component={InputTextArea}
      />

      <Field
        name="image"
        type="file"
        disabled={photoSliderLimit}
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
        disabledDateStartEndPhotoSlider
        dateStartEnd={dateStartEnd}
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="Start Appearance Date"
        placeholder="Start Appearance Date"
        component={DatePicker}
      />

      <Field
        name="date_end"
        type="date"
        icon=""
        disabledDateStart
        disabledDateStartEndPhotoSlider
        dateStartEnd={dateStartEnd}
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="End Appearance Date"
        placeholder="End Appearance Date"
        component={DatePicker}
      />

      <Field
        name="start_time"
        type="date"
        icon=""
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="Start Time"
        placeholder="Start Time"
        component={TimePickerForm}
      />

      <Field
        name="end_time"
        type="date"
        icon=""
        disabled={photoSliderLimit}
        layout={formItemLayout}
        label="End Time"
        placeholder="End Time"
        component={TimePickerForm}
      />

       
    </Form>
  );
};


AddPhotoSliderForm = connect(
  state => ({
    
  }),
)(AddPhotoSliderForm);


export default AddPhotoSliderForm;

