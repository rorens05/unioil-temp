// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import moment from 'moment';
 
// COMPONENTS
import { Input, Radio, InputTextArea, UploadImage, Select, DatePicker ,TimePickerForm } from 'components/Forms';
 
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
    handleFileUpload,
    branchesOptions,
    promoTypeOptions,
    branchDefaultValue ,
    promoTypeDefaultValue
  } = props;

  return (
    <Form noValidate>

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
        name="station_uuid"
        type="select"
        icon=""
        defaultValue={branchDefaultValue && (branchDefaultValue)}
        layout={formItemLayout}
        label="Branch"
        placeholder="Select Branches"
        mode="multiple"
        optionsList={branchesOptions}
        component={Select}
      />

      <Field
        name="date_start"
        type="date"
        icon=""
        defaultValue={ moment(props.values.date_start, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="Start Date"
        placeholder="Start Date"
        component={DatePicker}
      />

      <Field
        name="date_end"
        type="date"
        icon=""
        defaultValue={ moment(props.values.date_end, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="End Date"
        placeholder="End Date"
        component={DatePicker}
      />

      <Field
        name="start_time"
        type="date"
        icon=""
        //defaultValue={ moment(props.values.date_start, 'HH:mm:ss') }
        defaultValue={moment(props.values.start_time, 'THH:mm:ss')}
        layout={formItemLayout}
        label="Start Time"
        placeholder="Start Time"
        component={TimePickerForm}
      />

      <Field
        name="end_time"
        type="date"
        icon=""
        defaultValue={moment(props.values.end_time, 'THH:mm:ss')}
        layout={formItemLayout}
        label="End Time"
        placeholder="End Time"
        component={TimePickerForm}
      />

      <Field
        name="is_toppromotion"
        icon="user"
        layout={formItemLayout}
        defaultValue={0}
        isRadioButton
        optionsList={[
          { label: "Yes", value: 1 },
          { label: "No", value: 0, }
        ]}
        label="Add in Top 2 Promos"
        component={Radio}
      />

      <Field
        name="promo_type"
        type="select"
        icon=""
        defaultValue={promoTypeDefaultValue && (promoTypeDefaultValue)}
        layout={formItemLayout}
        label="Promo Type?"
        placeholder="Select Promo Type"
        mode="single"
        optionsList={promoTypeOptions}
        component={Select}
      />

      <Field
        name="is_gps"
        icon="user"
        layout={formItemLayout}
        defaultValue={0}
        isRadioButton
        optionsList={[
          { label: "Yes", value: 1 },
          { label: "No", value: 0, }
        ]}
        label="Add in GPS?"
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

