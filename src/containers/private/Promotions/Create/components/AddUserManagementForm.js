import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Radio, InputTextArea, UploadImage, Select } from 'components/Forms';

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

function AddUserManagementForm(props) {
  const {
    isSubmitting,
    handleSubmit
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
        name="upload_image"
        type="files"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
      />

      <Field
        name="content_type"
        type="text"
        icon=""
        layout={formItemLayout}
        label="Content Type"
        placeholder="Promo"
        component={Input}
      />

      <Field
        name="branch"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Branches"
        placeholder="Select Branches"
        component={Select}
      />
      

      <Field
        name="user_role"
        icon="user"
        layout={formItemLayout}
        optionsList={[
          {
            label: "System Admin",
            value: "1"
          },
          {
            label: "Marketing Personnel",
            value: "2",
          }
        ]}
        label="User Role"
        component={Radio}
      />

      <Field
        name="generated_password"
        type="text"
        icon=""
        withActionBtn={{
          action: ()=> { console.log('helow world') },
          name: "Generate"
        }}
        layout={formItemLayout}
        label="Deafult Password"
        component={Input}
      />
      
    </Form>
  );
};


AddUserManagementForm = connect(
  state => ({
    
  }),
)(AddUserManagementForm);


export default AddUserManagementForm;

