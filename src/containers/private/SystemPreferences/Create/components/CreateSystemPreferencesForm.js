import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Radio, InputTextArea, UploadImage, Select, DatePicker } from 'components/Forms';

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

function CreateSystemPreferencesForm(props) {
  const {
    isSubmitting,
    handleSubmit
  } = props;

  return (
    <Form noValidate>

      <h2 style={{margin: '25px 35px'}}>Company Logo</h2>
      <Field
        name="upload_image"
        type="file"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
      />
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>GPS Radius</h2>
      <Field
        name="gps_radius_meters"
        type="text"
        icon=""
        layout={formItemLayout}
        label="GPS Radius (in meters)"
        placeholder="GPS Radius (in meters)"
        rows={6}
        component={InputTextArea}
      />
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>Customer Service Details</h2>
      <Field
        name="contact_email"
        type="email"
        icon=""
        layout={formItemLayout}
        label="Contact Email Address"
        placeholder="Contact Email Address"
        component={Input}
      />
      <Field
        name="contact_number"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Contact Number"
        placeholder="Contact Number"
        component={Input}
      />
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>System Administrator Details</h2>
      <Field
        name="contact_details"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Contact Details"
        placeholder="Contact Number"
        component={Input}
      />
      
    </Form>
  );
};


CreateSystemPreferencesForm = connect(
  state => ({
    
  }),
)(CreateSystemPreferencesForm);


export default CreateSystemPreferencesForm;



const styles = {
  borderDivision: {
    background: '#fcfcfc',
    borderTop: '1px solid #e6ecf5',
    borderBottom: '1px solid #e6ecf5',
    padding: '6px',
    margin: '43px 0px',
  }
}