import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const DatePickerForm = ({
  field: { name, ...field },
  form: { touched, errors, handleSubmit, setFieldValue, handlePanelChange, ...form },
  type,
  layout,
  label,
  format,
  minDateToday,
  required,
  ...props
}) => {

  const onDateChange = (value, isDateRange = false) => {
    value && setFieldValue(name, isDateRange ? [value[0].format(format), value[1].format(format)] : value.format(format))
  }

  // Disable date less than `Today`
  // use minDateToday props
  const disabledDate = (current) => {
    if (minDateToday) {
      var oneDay = (1 * 24 * 60 * 60 * 1000);
      return current && (current.valueOf() < (Date.now() - oneDay));
    }
  }

  return (
    <FormItem
      {...layout}
      label={label}
      required={required}
      validateStatus={errors[name] && 'error'}
      help={errors[name]}
    >
      { type === 'date'  && 
        <DatePicker
          {...props} 
          onChange={(value) => onDateChange(value)}
          format={format}
          disabledDate={disabledDate}
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