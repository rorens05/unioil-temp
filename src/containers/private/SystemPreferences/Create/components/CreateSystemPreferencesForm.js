// LIBRARIES
import React from 'react';
import { Button, Popover } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, UploadImage, InputNumberAntD, 
        InputMaskNumber } from 'components/Forms';

// HELPER FUNCTIONS


const content = (
  <div>
    <div>Select this button to sync the below data from the 
      Unioil Website to the Unioil Mobile App system.</div>
    <div>- City and Province</div>
    <div>- Products</div>
    <div>- Stations</div>
    {/* <div>- About Us</div> */}
  </div>
);

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
    loading,
    handleSubmit,
    handleFileUpload,
    onRemoveImage,
    syncStratuscast
  } = props;

  return (
    <Form noValidate>
      
      <h2 style={{margin: '25px 35px'}}>Company Logo</h2>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="System Parameters"
        action={handleSubmit}
        actionBtnName="Submit"
        // cancel={()=> {console.log('cancel button')}}
        // cancelBtnName="Cancel"
      />
      <Field
        name="logo"
        type="file"
        accept=".jpg , .png"
        multiple={false}
        fileList = {[
          // {
          //   uid: '123-dbeser',
          //   name: props.values.logo,
          //   status: 'done',
          //   url: `${process.env.REACT_APP_DEV}/${props.values.logo}`,
          //   thumbUrl: `${process.env.REACT_APP_DEV}/${props.values.logo}`,
          // }
        ]}
        imageUrl={props.values.logo && `${props.values.logo}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        handleFileUpload={handleFileUpload}
        imgWidth="294px"
        beforeUpload={()=> { return false}}
        isDefault
      />
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>GPS Radius</h2>
      <Field
        name="gps"
        type="text"
        icon=""
        defaultValue={props.values.gps}
        layout={formItemLayout}
        label="GPS Radius (in meters)"
        placeholder="0"
        rows={6}
        min={0}
        component={InputNumberAntD}
      />
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>Customer Service Details</h2>
      <Field
        name="contact_email_address_mobile"
        type="email"
        icon=""
        layout={formItemLayout}
        label="Contact Email Address"
        placeholder="username@domain.com"
        component={Input}
      />
      <Field
        name="contact_number_mobile"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Contact Number"
        placeholder="63 947 687 9999"
        mask="99 999 999 9999"
        component={InputMaskNumber}
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
      <div style={styles.borderDivision}></div>
      <h2 style={{margin: '25px 35px'}}>Update Details</h2>

     <Popover placement="topRight" content={content} title="Info">
        <Button  
          loading={loading} 
          onClick={syncStratuscast}
          style={{ width: '250px', margin:'0 35px 30px'}}
          type="primary" 
        >
          { loading ? "Syncing Data Please wait..." : "Sync Data"  } 
        </Button>
      </Popover>

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