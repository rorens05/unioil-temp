import * as React from 'react';
import { Form, Icon, Input, Upload } from 'antd';

const FormItem = Form.Item;

const UploadImage = ({
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
    
    <Upload.Dragger {...props} {...field} action="/upload.do">
			<p className="ant-upload-drag-icon">
					<Icon type="inbox" />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
			<p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Upload.Dragger>
      
    </FormItem>
  );
};

export default UploadImage;