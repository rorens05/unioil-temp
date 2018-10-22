import React, { Component } from 'react';
import { Form, Radio } from 'antd';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let styles = {
  ':select': {
    backgroundColor: 'yellow',
    color: 'red'
  }
};


class InputForm extends Component {


  handleChange = (e) => {
    const { setFieldValue } = this.props.form;
    const { name } = this.props.field;
    // Add custom action `onChange`
    // if(this.props.handleResetValue) {
    //   this.props.handleResetValue(this.props.form);
    // }
    return setFieldValue(name, e.target.value);
  }
  
  render() {
  

    const {
      field: { ...field },
      form: { touched, errors, ...form },
      required,
      icon,
      layout,
      optionsList,
      isRadioButton,
      ...props,
    } = this.props;

    let _props = {...props};
    let _field = {...field};
    
    if(!_field.value) {
      _field.value = _props.defaultValue
    }
    
    return (
      <FormItem
        {...layout}
        required={required}
        label={props.label}
        style={{marginBottom: '10px'}}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
      >
        <Radio.Group {..._field} {..._props}   onChange={this.handleChange}>
        {
          optionsList ? (
            optionsList.map((item,i) => {
              if(isRadioButton) {
                return <Radio.Button value={item.value} disabled={item.isDisabled} key={i} style={styles}>
                    {item.label}
                </Radio.Button>
              }
              return <Radio value={item.value} key={i} style={styles}>
                {item.label}
              </Radio>
            })
          ) : null
        }
        </Radio.Group>

      </FormItem>
    );
  }
}

export default InputForm;