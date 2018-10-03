import React, { Component } from 'react';
import { Form, Icon, Input, Upload, message } from 'antd';

const FormItem = Form.Item;


class UploadImage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        fileUpload: null,
        loading: false,
        hasError: false,
        imageUrl: props.imageUrl
      };
  }

  normFile = (info) => {
    const { handleFileUpload } = this.props;
    
    if(info) {
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));

      handleFileUpload(info)
    }
    
    // if (Array.isArray(e)) {
    //   return this.setState({fileUpload: e});
    // }
    // return e && this.setState({fileUpload: e.fileList});

    
  }


  getBase64 =(img, callback)=> {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => callback(reader.result));
   
  }
  
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' ;
    if (!isJPG) {
      message.error('You can only upload JPG or PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
    
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
      multipleFileUpload,
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

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;
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
        multipleFileUpload ? 
          (
            <Upload.Dragger {..._props} {..._field} {...props_list_image} onChange={this.normFile} >
              <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          ) :
          (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                accept=".jpg , .png"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.normFile}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" width="200"/> : uploadButton}
            </Upload>
          )
      }
      
      </FormItem>
    );
  }
}

export default UploadImage;