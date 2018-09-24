import React, { Component } from 'react';
import { Form, Icon, Input, Upload } from 'antd';

const FormItem = Form.Item;


class UploadImage extends Component {
  state = {
    fileUpload: null
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    
    if (Array.isArray(e)) {
      return this.setState({fileUpload: e});
    }
    return e && this.setState({fileUpload: e.fileList});
  }
  
  render() {

    const {
      field: { ...field },
      form: { touched, errors, ...form },
      required,
      icon,
      layout,
      withActionBtn,
      action,
      ...props
    } = this.props;

    let _props = {...props};
    let _field = {...field};
    
    const { onChange, onBlur, ...restField } = field;
    const { fileUpload } =this.state;
    // _field.type = _props.type;
    // if(fileUpload) {
    //   console.log(_field.value,'pasok');
    //   _field.value = fileUpload[0].originFileObj
    // }
    // console.log(_field.value,'pasok');
    return (
      <FormItem
        {...layout}
        required={required}
        label={props.label}
        style={{marginBottom: '10px'}}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
      >
    
        <Upload.Dragger {..._props} {..._field} onChange={this.normFile} >
          <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      
      </FormItem>
    );
  }
}

export default UploadImage;