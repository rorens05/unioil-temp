// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
 
// COMPONENTS
import { Input, Radio, InputTextArea, UploadImage, Select, DatePicker } from 'components/Forms';
 
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
        type="file"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        multipleFileUpload
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
        mode="multiple"
        optionsList={[
          { label: "Guadalupe", value: "Guadalupe" },
          { label: "BGC", value: "BGC", },
          { label: "Makati", value: "Makati", }
        ]}
        component={Select}
      />

      <Field
        name="content_type"
        type="date"
        icon=""
        layout={formItemLayout}
        label="Content Type"
        placeholder="Promo"
        component={DatePicker}
      />

      <Field
        name="start_date"
        type="date"
        icon=""
        layout={formItemLayout}
        label="Start Date"
        placeholder="Start Date"
        component={DatePicker}
      />

      <Field
        name="end_date"
        type="date"
        icon=""
        layout={formItemLayout}
        label="End Date"
        placeholder="End Date"
        component={DatePicker}
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

      <Field
        name="whats_hot"
        icon="user"
        layout={formItemLayout}
        defaultValue={0}
        isRadioButton
        optionsList={[
          { label: "Yes", value: 1 },
          { label: "No", value: 0, }
        ]}
        label="Add in What's Hot?"
        component={Radio}
      />

      <Field
        name="add_top_promos"
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
        name="branch"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Branches"
        placeholder="Select Branches"
        mode="single"
        optionsList={[
          { label: "Red", value: "Red" },
          { label: "Green", value: "Green", },
          { label: "Blue", value: "Blue", }
        ]}
        component={Select}
      />

      <Field
        name="add_gps"
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

