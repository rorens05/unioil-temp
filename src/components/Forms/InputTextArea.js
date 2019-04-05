import * as React from 'react';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const InputTextArea = ({
  field: { ...field },
  form: { touched, setFieldValue, errors, ...form },
  required,
  icon,
  layout,
  withActionBtn,
  action,
  onCountText,
  charsperpage,
  pagecount,
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
      {onCountText && <div style={{position: 'relative'}}>
          <div style={{position: 'absolute',right: '0%', top: '-18px'}}>
          <span style={{color: field.value.length > charsperpage ? 'red' : 'rgba(0, 0, 0, 0.65)'}}>{field.value.length}</span>/{charsperpage && charsperpage}</div>
      </div>
      } 
    </FormItem>
  );
};

export default InputTextArea;