import React, { Component } from 'react';
import { Form, Cascader } from 'antd';
import { fetchData } from 'utils/Api';
const FormItem = Form.Item;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class CascaderForm extends Component {
  async componentDidMount() {
    const { url } = this.props;
    const response = await fetchData(url);
    this.setState({
      options: response.data.data
    })
  }

  render() {
    const {
      field: { name, /* ...field */ },
      form: { errors, setFieldValue, /* ...form */ },
      layout,
      label,
      required,
      ...props
    } = this.props;

    return (
      <FormItem
        {...layout}
        required={required}
        label={label}
        validateStatus={errors[name] && 'error'}
        help={errors[name]}
      >
        <Cascader 
          {...props}
          onChange={this.handleChange = (value) => { setFieldValue(name, value) }}
          options={options} 
        />
      </FormItem>
    );
  }
}

export default CascaderForm;