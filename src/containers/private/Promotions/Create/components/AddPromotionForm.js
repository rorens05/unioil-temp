// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import moment from 'moment' 

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, Radio, InputTextArea, UploadImage, Select, 
  DatePicker, TimePickerForm } from 'components/Forms';
 
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

function AddPromotionForm(props) {
  const {
    isSubmitting,
    loading,
    handleSubmit,
    branchesOptions,
    promoTypeOptions,
    handleFileUpload,
    responsePromotionTopUp,
    branchesOptionsTwo,
    history
  } = props;

  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Promotions"
        action={handleSubmit}
        actionBtnName="Submit"
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> { history.push("/promotions")}}
        cancelBtnName="Cancel"
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
        isRatioMessage={{
          message: "Aspect Ratio 4:3 (ex. 1020 x 621).",
        }}
        limit100kb
        name="image"
        type="file"
        accept=".jpg , .png, .gif"
        multiple={false}
        imageUrl={props.values.image && `${props.values.image}`}
        className="upload-list-inline"
        icon="user"
        layout={formItemLayout}
        label="Upload Image"
        placeholder="Upload Image"
        component={UploadImage}
        imgWidth="294px"
        imgStyle={{width:"100%", height:"170"}}
        handleFileUpload={handleFileUpload}
        isDefault
      />

      <Field
        name="station_uuid"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Branch"
        placeholder="Select Branches"
        mode="multiple"
        optionsList={branchesOptions}
        branchesOptionsTwo={branchesOptionsTwo}
        component={Select}
      />

      <Field
        name="date_start"
        type="date"
        icon=""
        layout={formItemLayout}
        label="Start Date"
        placeholder="Start Date"
        component={DatePicker}
      />

      <Field
        disabledDateStart
        name="date_end"
        type="date"
        icon=""
        layout={formItemLayout}
        label="End Date"
        placeholder="End Date"
        component={DatePicker}
      />

      <Field
        name="start_time"
        type="date"
        icon=""
        defaultOpenValue={moment('00:00', 'HH:mm')}
        format={'HH:mm'}
        layout={formItemLayout}
        label="Start Time"
        placeholder="Start Time"
        component={TimePickerForm}
      />

      <Field
        name="end_time"
        type="date"
        icon=""
        defaultOpenValue={moment('00:00', 'HH:mm')}
        format={'HH:mm'}
        layout={formItemLayout}
        label="End Time"
        placeholder="End Time"
        component={TimePickerForm}
      />

      <Field
        //disabled={responsePromotionTopUp && responsePromotionTopUp != "disable" ? false : true}
        name="is_toppromotion"
        icon="user"
        layout={formItemLayout}
        defaultValue={0}
        isRadioButton
        optionsList={[
          { 
            label: "Yes", 
            value: 1 ,
            isDisabled: responsePromotionTopUp && responsePromotionTopUp != "disable" ? false : true
          },
          { 
            label: "No", 
            value: 0, 
          }
        ]}
        label="Add in Top 2 Promos"
        component={Radio}
      />

      <Field
        name="promo_type"
        type="select"
        icon=""
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


AddPromotionForm = connect(
  state => ({
    
  }),
)(AddPromotionForm);


export default AddPromotionForm;

