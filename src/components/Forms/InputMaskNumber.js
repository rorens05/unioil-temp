import * as React from 'react';
import { Form, Icon, Input, Row, Col, Button } from 'antd';
import ReactInputMask from 'react-input-mask';

const FormItem = Form.Item;

const InputNumberForm = ({
  field: { ...field },
  form: { touched, errors, ...form },
  required,
  icon,
  layout,
  withActionBtn,
  action,
  loading,
  mask,
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
    <ReactInputMask {...props} 
        className="ant-input"
        {...field} mask={mask} maskChar=" "
    />
      
    </FormItem>
  );
};

export default InputNumberForm;