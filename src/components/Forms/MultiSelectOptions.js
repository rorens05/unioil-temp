import * as React from 'react';
import { Form, Icon, Input , Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const MultiSelectOptions = ({
  field: { ...field },
  form: { touched, errors, ...form },
  required,
  icon,
  layout,
  withActionBtn,
  action,
  ...props
}) => {
  return (
    <FormItem
      {...layout}
      required={required}
      label={props.label}
      style={{marginBottom: '10px'}}
      validateStatus={touched[field.name] && errors[field.name] && 'error'}
      help={touched[field.name] && errors[field.name]}
    >
    
    <Select 
      {...props}
      {...field}
      mode="multiple"
    >
      <Option value="red">Red</Option>
      <Option value="green">Green</Option>
      <Option value="blue">Blue</Option>
    </Select>
      
    </FormItem>
  );
};

export default MultiSelectOptions;