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
  isRadioButton,
  ...props,
}) => {
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
    <Radio.Group {..._field} {..._props} >
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
};

export default InputForm;