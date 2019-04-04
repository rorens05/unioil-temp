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
    
    <div>
      <TextArea 
          {...props}
          {...field}
          onKeyPress={(e)=> { if(onCountText) onCountText(e) }}
          prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
      />
      {onCountText && <div style={{display: 'flex',flexDirection: 'row-reverse'}}>
          <div>{pagecount ? pagecount : 0}/{charsperpage && charsperpage}</div>
      </div>} 
    </div>
      
    </FormItem>
  );
};

export default InputTextArea;