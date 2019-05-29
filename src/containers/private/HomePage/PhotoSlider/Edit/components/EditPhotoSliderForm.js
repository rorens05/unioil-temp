// LIBRARIES
import React from 'react'
import { Row, Button, Col } from 'antd'
import { Form, Field } from 'formik'
import { connect } from 'react-redux'
import moment from 'moment'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
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
    loading,
    handleSubmit,
    promotionsDefaultValue,
    promotionsOptions,
    handleFileUpload,
    dateStartEnd,
    handleGetDate,
    history,
    handleAutoFillDeatils,
  } = props;

  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Update Photo Slider"
        action={handleSubmit}
        actionBtnName="Submit"
        withConfirm={{message: "Save changes to this record?"}}
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> history.push("/home-page/photo-slider")}
        cancelBtnName="Cancel"
      />
      <Field
        allowClear
        name="promotion_uuid"
        type="select"
        icon=""
        layout={formItemLayout}
        label="Promotion Name"
        placeholder="Promotion Name"
        mode="single"
        defaultValue={promotionsDefaultValue && (promotionsDefaultValue)}
        optionsList={promotionsOptions}
        handleGetDate={handleGetDate}
        component={Select}
        handleAutoFillDeatils={handleAutoFillDeatils}
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
          message: <div style={{fontSize: '13px'}} >
            <div>Image Size: 1020 x 621</div>
            <div>Maximum File Size: 100KB</div>
          </div>,
          // dimensions: [1021,621]
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
      />

      <Field
        name="date_start"
        type="date"
        icon=""
        isEdit
        disabledDateStartEndPhotoSlider
        dateStartEnd={props.values.promotion_uuid ? dateStartEnd : null }
        defaultValue={ moment(props.values.date_start, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="Start Appearance Date"
        placeholder="Start Appearance Date"
        component={DatePicker}
        isAutoFill
      />

      <Field
        name="date_end"
        type="date"
        icon=""
        isEdit
        disabledDateStart
        disabledDateStartEndPhotoSlider
        disabledDateStartEndPhotoSliderEndDate
        dateStartEnd={props.values.promotion_uuid ? dateStartEnd : null }
        defaultValue={ moment(props.values.date_end, 'YYYY-MM-DD') }
        layout={formItemLayout}
        label="End Appearance Date"
        placeholder="End Appearance Date"
        component={DatePicker}
        isAutoFill
      />

      <Field
        name="start_time"
        type="date"
        icon=""
        disabledHours={()=> {
          if(props.values.promotion_uuid) {
            let time =  dateStartEnd && dateStartEnd.date_start && moment(dateStartEnd.date_start, 'YYYY-MM-DDTHH:mm').format('HH:mm').replace(/[^0-9]/g,'').substring(0, 2)
            let disabledTime = [];
            let timeLimit = time;

            let date_start = moment(props.values.date_start).format('YYYY-MM-DD');
            let promotion_date_start = moment(dateStartEnd.date_start).format('YYYY-MM-DD');

            if(date_start != promotion_date_start) {
              return []
            } else {
              if(time) {
                while(timeLimit > 0) {
                  timeLimit--;
                  disabledTime.push(timeLimit)
                }
              }
              return disabledTime 
            }

          } else {
            return [] 
          }
        }}
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
        disabledHours={() => {
          if(props.values.promotion_uuid) {
            let time =  dateStartEnd && dateStartEnd.date_end && moment(dateStartEnd.date_end, 'YYYY-MM-DDTHH:mm').format('HH:mm').replace(/[^0-9]/g,'').substring(0, 2)
            let disabledEndTime = [];
            let timeLimit = time;

            let date_end = moment(props.values.date_end).format('YYYY-MM-DD');
            let promotion_date_end = moment(dateStartEnd.date_end).format('YYYY-MM-DD');

            if(date_end != promotion_date_end) {
              return []
            } else {
              if(time) {
                while(timeLimit < 23) {
                  timeLimit++;
                  disabledEndTime.push(timeLimit)
                }
              }
              return disabledEndTime
            }
            
          } else {
            return []
          }
          
        }}
        defaultValue={moment(props.values.end_time, 'HH:mm')}
        format={'HH:mm'}
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

