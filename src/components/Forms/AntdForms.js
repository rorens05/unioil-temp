import React from "react";
import { Form, Input, Radio, Select, Checkbox, Button, DatePicker } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const formItemLayout = {
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 7 }
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 14 }
    // }
};
  


const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    const inputs = {...input};
    const rests = {...rest};
    console.log(inputs,'inputss', rests , 'ressttss')
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <Component {...input} {...rest} children={children} />
      </FormItem>
    );
  };

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);

