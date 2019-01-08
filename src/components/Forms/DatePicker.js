import React from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const DatePickerForm = ({
  field: { ...field },
  form: { touched, errors, handleSubmit, setFieldValue, handlePanelChange, ...form },
  type,
  layout,
  label,
  format,
  minDateToday,
  required,
  disabledDateStart,
  dateStartEnd,
  disabledDateStartEndPhotoSlider,
  disabledDateStartEndPhotoSliderEndDate,
  isEdit,
  isAutoFill,
  ...props
}) => {

  const onDateChange = (value, isDateRange = false) => {
   
    value && setFieldValue(field.name, isDateRange 
      ? [value[0].format(format), value[1].format(format)] 
      : value.format(format)
    )

    
    if(value == null) {
      setFieldValue(field.name, isDateRange 
        ? [value[0].format(format), value[1].format(format)] 
        : null
      )
    }
   
   
  }

  // Disable date less than `Today`
  // use minDateToday props
  // const disabledDate = (current) => {
  //   if (minDateToday) {
  //     var oneDay = (1 * 24 * 60 * 60 * 1000);
  //     return current && (current.valueOf() < (Date.now() - oneDay));
  //   }
  // }

  const disabledDate = (current) => {
    // Can not select days before today and today

    // for promotions
    if(disabledDateStart && !disabledDateStartEndPhotoSlider) {
      if(form.values.date_start) {
        return current && current < moment(form.values.date_start);
      } else {
        //return current && moment(current).add(2,'days') < moment().endOf('day').add(2,'days');
      }
    }
    // for photo slider Date Start
    if(disabledDateStartEndPhotoSlider && !disabledDateStartEndPhotoSliderEndDate) {
      if(dateStartEnd) {
        if(current && current.format() < moment(dateStartEnd.date_start).format()) {
          if(isEdit) {
            //return current && current.format() < moment(dateStartEnd.date_start).subtract(1,'days').format()
          }
          return current && current.format() < moment(dateStartEnd.date_start).format()
        } else {
          if(isEdit) {
            return current && current.format() > moment(dateStartEnd.date_end).format();
          }
          //return current && current.format() > moment(dateStartEnd.date_end).add(1,'days').format();
          return current && current.format() > moment(dateStartEnd.date_end).format();
        }
      }
    }

    // for photo slider date End
    if(disabledDateStartEndPhotoSliderEndDate) {
      if(dateStartEnd) {
        if(current && current.format() < form.values.date_start) {
          // disabled previous date
          return current && current < moment(form.values.date_start);
        } else {
          // diabled past date
          if(isEdit) {
            return current && current.format() > moment(dateStartEnd.date_end).format();
          }
          //return current && current.format() > moment(dateStartEnd.date_end).add(1,'days').format();
          return current && current.format() > moment(dateStartEnd.date_end).format();
        }
      }
    }

    if(disabledDateStart) {
      if(dateStartEnd) {
        // return
      } else {
        if(form.values.date_start) {
          return current && current < moment(form.values.date_start);
        }
      }
      
    }
    
  }

  let _props = {...props}; let _field = {...field};
  

    if(_field.value !== "") {
      _props.value =  _field.value && moment(_field.value,format)
    }

  return (
    <FormItem
        {...layout}
        required={required}
        label={label}
        style={{marginBottom: '10px'}}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
    >
      { type === 'date'  && 
          <DatePicker
            {..._props} 
            onChange={(value) => onDateChange(value)}
            format={format}
            disabledDate={disabledDateStartEndPhotoSlider || disabledDateStart ? disabledDate : ()=> { return false }  }
            style={{width: '250px'}}
          /> 
      }

      { type === 'range' && 
        <RangePicker
          {...props}
          onChange={(value) => onDateChange(value, true)}
          format={format}
          disabledDate={disabledDate}
        />
      }
    </FormItem>
  );
};

export default DatePickerForm;