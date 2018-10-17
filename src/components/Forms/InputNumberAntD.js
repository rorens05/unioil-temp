import React, { Component } from 'react';
import { Form, Icon, InputNumber  } from 'antd';



const FormItem = Form.Item;

class InputNumberAntD extends Component {
  
  handleChange = (value) => {
    const { setFieldValue } = this.props.form;
		const { name } = this.props.field;
		
		let valueNum = parseFloat(value).toFixed(2)
    // Add custom action `onChange`
    return setFieldValue(name, valueNum);
  }
  
  render() {
    const children = [];


    const {
			field: { ...field },
			form: { touched, errors, ...form },
			required,
			icon,
			layout,
			withActionBtn,
			action,
			min,
			max,
			step,
			...props
    } = this.props;
    
    return (
      <FormItem
				{...layout}
				required={required}
				label={props.label}
				style={{marginBottom: '10px'}}
				validateStatus={touched[field.name] && errors[field.name] && 'error'}
				help={touched[field.name] && errors[field.name]}
			>
			

			<InputNumber
				{...props}
				//defaultValue={0}
				style={{width: '100%'}}
				min={min && min}
				max={max && max}
				step={step && step}
				//formatter={value => value && `${value}`}
				//parser={value => value && value.replace('', '')}
				// formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      	// parser={value => value.replace(/\$\s?|(,*)/g, '')}
				onChange={this.handleChange}
			/>
				
			</FormItem>
    );
  }
}

export default InputNumberAntD;