import React from 'react';
import { Checkbox, Form } from 'antd';
const FormItem = Form.Item;

const CheckboxForm = ({
  field: { name, ...field },
  form: { touched, errors, handleChange, setFieldValue, ...form },
  label,
  inline,
  ...props,
}) => {

  if (inline) {
    return (
      <Checkbox
        {...props}
        {...field}
        name={name}
        type="checkbox"
        checked={field.value}
        onChange={this.handleChange = (value) => { setFieldValue(name, !field.value) }}
      >
        {label}
      </Checkbox>
    )
  } else {
    return (
      <FormItem
        validateStatus={touched[name] && errors[name] && 'error'}
        help={touched[name] && errors[name]}
      >
        <Checkbox
        {...props}
        {...field}
        name={name}
          type="checkbox"
          checked={field.value}
          onChange={this.handleChange = (value) => { setFieldValue(name, !field.value) }}
        >
          {label}
        </Checkbox>
      </FormItem>

    );
  }

};

export default CheckboxForm;