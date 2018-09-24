import * as React from 'react';
import { Form, Icon, Input, Row, Col, Button } from 'antd';
import InputPassword from 'antd-input-password';

const FormItem = Form.Item;

const InputPasswords = ({
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
      <InputPassword {...props} {...field} />
    </FormItem>
  );
};

export default InputPasswords;