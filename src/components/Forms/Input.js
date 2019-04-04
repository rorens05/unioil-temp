import * as React from 'react';
import { Form, Icon, Input, Row, Col, Button, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

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
  isCopyUsername,
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
      <div style={{display: 'flex'}}>
        <Input
          {...props}
          {...field}
          prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
        />
        {
          isCopyUsername && (
            <CopyToClipboard text={field.value}>
              <Button 
                  loading={loading}
                  disabled={
                    field.value.length > 0 ? false : true
                  }
                  style={{ 
                    padding: '0 30px',
                    opacity: field.value.length > 0 ? 'initial' : 0.8,
                    margin: '0 0 0 10px',background:  '#E74610', borderColor:'#E74610', color: '#fff'
                  }} 
                  onClick={()=> message.success('Username successfully copied.')}>
                  Copy
              </Button> 
            </CopyToClipboard>
          )
        }
      </div> 
      : 
      <Row gutter={8}>
        <Col span={13}>
          <Input
            {...props}
            {...field}
            className="generated-input"
            prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} 
          /> 
        </Col>
        <Col span={11}>
          <Button 
            loading={loading}
            disabled={withActionBtn.disabled}
            style={{opacity: withActionBtn.disabled ? 0.8 : 'initial' ,background:  '#E74610', borderColor:'#E74610', color: '#fff'}} onClick={withActionBtn.action}>{withActionBtn.name}
          </Button>
          <CopyToClipboard text={withActionBtn.password} onCopy={withActionBtn.copyAction ? withActionBtn.copyAction : ()=> {return null}}>
            <Button 
              loading={loading}
              disabled={withActionBtn.copyAction ? false : true}
              style={{
                padding: '0 30px',
                opacity: withActionBtn.copyAction ? 'initial' : 0.8  , background:  '#E74610', borderColor:'#E74610', color: '#fff', marginLeft: '5px'}} 
             // onClick={withActionBtn.copyAction ? withActionBtn.copyAction : ()=> {return null} }
            >
              Copy
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    }
      
    </FormItem>
  );
};

export default InputForm;