import * as React from 'react';
import { Form, Radio } from 'antd';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let styles = {
  ':select': {
    backgroundColor: 'yellow',
    color: 'red'
  }
};

const InputForm = ({
  field: { ...field },
  form: { touched, errors, ...form },
  required,
  icon,
  layout,
  optionsList,
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
      <RadioGroup {...props} {...field}>
        {
          optionsList ? (
            optionsList.map((item,i) => {
              return <Radio value={item.value} key={i} style={styles}>
                {item.label}
              </Radio>
            })
          ) : null
        }
        
      </RadioGroup>
    </FormItem>
  );
};

export default InputForm;