// LIBRARIES
import React from 'react'
import { Row, Button, Col } from 'antd'
import { Form, Field } from 'formik'
import { connect } from 'react-redux'
import moment from 'moment'

// COMPONENTS
import { Input, Select, DatePicker , InputTextArea, UploadImage ,TimePickerForm } from 'components/Forms'

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
    branchDefaultValue,
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
        label="Branches"
        placeholder="Promotion Name"
        mode="single"
        defaultValue={branchDefaultValue && (branchDefaultValue)}
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
        imageUrl={props.values.image && `${process.env.REACT_APP_IMG_URL}${props.values.image}`}
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
        defaultValue={ moment(props.values.date_start, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="Start Appearance Date"
        placeholder="Start Appearance Date"
        component={DatePicker}
      />

      <Field
        name="date_end"
        type="date"
        icon=""
        defaultValue={ moment(props.values.date_end, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="End Appearance Date"
        placeholder="End Appearance Date"
        component={DatePicker}
      />

      <Field
        name="start_time"
        type="date"
        icon=""
        //defaultValue={ moment(props.values.date_start, 'HH:mm:ss') }
        defaultValue={moment(props.values.start_time, 'HH:mm:ss')}
        layout={formItemLayout}
        label="Start Time"
        placeholder="Start Time"
        component={TimePickerForm}
      />

      <Field
        name="end_time"
        type="date"
        icon=""
        defaultValue={moment(props.values.end_time, 'HH:mm:ss')}
        layout={formItemLayout}
        label="End Time"
        placeholder="End Time"
        component={TimePickerForm}
      />

    </Form>
  );
};


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

