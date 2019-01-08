import React from 'react';
import { Form, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const TimePickerForm = ({
  field: { ...field },
  form: { touched, errors, handleSubmit, setFieldValue, handlePanelChange, ...form },
  type,
  layout,
  label,
  format,
  minDateToday,
  required,
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
  const disabledDate = (current) => {
    if (minDateToday) {
      var oneDay = (1 * 24 * 60 * 60 * 1000);
      return current && (current.valueOf() < (Date.now() - oneDay));
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
        <TimePicker
          {..._props}
          onChange={(value) => onDateChange(value)}
          format={format}
          //disabledDate={disabledDate}
          style={{width: '250px'}}
        /> 
    </FormItem>
  );
};

export default TimePickerForm;