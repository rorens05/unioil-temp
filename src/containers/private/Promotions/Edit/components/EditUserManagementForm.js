// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import moment from 'moment';
 
// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
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
    loading,
    handleSubmit,
    handleFileUpload,
    branchesOptions,
    promoTypeOptions,
    branchDefaultValue ,
    promoTypeDefaultValue,
    responsePromotionTopUp,
    history
  } = props;

  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Update Promotions"
        action={handleSubmit}
        actionBtnName="Submit"
        withConfirm={{message: "Save changes to this record?"}}
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> history.push("/promotions")}
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
        isRatioMessage
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
        disabledDateStart
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
        defaultValue={moment(props.values.start_time, 'HH:mm')}
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
        defaultValue={moment(props.values.end_time, 'HH:mm')}
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
        defaultValue={props.values.is_toppromotion == 1 ? 1 : 0}
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
        defaultValue={props.values.is_gps == 1 ? 1 : 0}
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

