import React, { Component } from 'react';
import { Form, Icon, Input, Upload } from 'antd';

const FormItem = Form.Item;


class UploadImage extends Component {
  state = {
    fileUpload: null
  }

  normFile = (e) => {
    const { handleFileUpload } = this.props;
    handleFileUpload(e)
    // if (Array.isArray(e)) {
    //   return this.setState({fileUpload: e});
    // }
    // return e && this.setState({fileUpload: e.fileList});
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
      fileList,
      messageUpload,
      ...props
    } = this.props;

    let _props = {...props};
    let _field = {...field};
    
    const { onChange, onBlur, ...restField } = field;
    const { fileUpload } =this.state;

    let props_list_image = {
      action: '',
      listType: 'picture',
      defaultFileList: [...fileList],
      className: 'upload-list-inline',
    };

    return (
      <FormItem
        {...layout}
        required={required}
        label={props.label}
        style={{marginBottom: '10px'}}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
      >
    
        <Upload.Dragger {..._props} {..._field} {...props_list_image} onChange={this.normFile} >
          <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">{messageUpload && messageUpload}</p>
          {/* <p className="ant-upload-hint">Support for a single or bulk upload.</p> */}
        </Upload.Dragger>
      
      </FormItem>
    );
  }
}

export default UploadImage;