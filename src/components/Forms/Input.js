import * as React from 'react';
import { Form, Icon, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

const InputForm = ({
  field: { ...field },
  form: { touched, errors, ...form },
  required,
  icon,
  layout,
  withActionBtn,
  action,
  loading,
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
    {
      !withActionBtn 
      ?
      <Input
        {...props}
        {...field}
        prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
      /> 
      : 
      <Row gutter={8}>
        <Col span={12}>
          <Input
            {...props}
            {...field}
            className="generated-input"
            prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
          /> 
        </Col>
        <Col span={12}>
          <Button 
            loading={loading}
            disabled={withActionBtn.disabled}
            style={{opacity: withActionBtn.disabled ? 0.8 : 'initial' ,background:  '#E74610', borderColor:'#E74610', color: '#fff'}} onClick={withActionBtn.action}>{withActionBtn.name}</Button>
        </Col>
      </Row>
    }
      
    </FormItem>
  );
};

export default InputForm;