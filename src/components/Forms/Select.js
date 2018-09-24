import React, { Component } from 'react';
import { Form, Select } from 'antd';

import { fetchData } from 'utils/Api';
const FormItem = Form.Item;
const Option = Select.Option;

class SelectForm extends Component {
  async componentDidMount() {
    // const { url } = this.props;
    // const response = await fetchData(url);
    // this.setState({
    //   options: response.data.data
    // })
  }

  handleChange = (value) => {
    const { setFieldValue } = this.props.form;
    const { name } = this.props.field;
    
    // Add custom action `onChange`
    return setFieldValue(name, value);
  }
  
  render() {
    const children = [];

    if (this.state && this.state.options) {
      this.state.options.map((item, key) => {
        children.push(<Option value={item.id.toString()}>{item.first_name}</Option>)
        return item;
      });
    }

    const {
      field: { name, /* ...field */ },
      form: { errors, /* ...form */ },
      layout,
      label,
      required,
      optionFilterProp,
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
        <Select 
          {...props}
          // filterOption={
          //   optionFilterProp ? 
          //   (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : ''
          // }
          mode="multiple"
          onChange={this.handleChange}
          children={children}
          >
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </Select>
      </FormItem>
    );
  }
}

export default SelectForm;