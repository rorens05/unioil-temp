import * as React from 'react';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const InputTextArea = ({
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
    
    <TextArea 
        {...props}
        {...field}
        prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
    />
      
    </FormItem>
  );
};

export default InputTextArea;