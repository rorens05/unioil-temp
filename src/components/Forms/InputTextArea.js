import * as React from 'react';
import { Form, Icon, Input, Tooltip } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;


const content = (
  <span>
    <div>This content will be used in the</div>
    <div>"Enter ID Number" page as part of</div>
    <div>the Apply for a Card process of</div>
    <div>the Unioil Mobile App.</div>
  </span>
);


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
  hasIcon,
  ...props
}) => {
  <Icon type="question-circle" />
  return (
    <FormItem
      {...layout}
      required={required}
      label={
        <span>
          {`${props.label} `} 
          {
            hasIcon && 
            <Tooltip placement="top" title={content}>
              <Icon type="question-circle" />
            </Tooltip>
          }
        </span>
      }
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