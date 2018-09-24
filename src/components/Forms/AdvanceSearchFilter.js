import React, { Component  } from 'react';
//import { Field, reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Icon, Input,Select  } from 'antd';

import { required } from 'constants/validation';
import {AInput,ASelect,ARangePicker} from './AntdForms'

const FormItem = Form.Item;
const { Option } = Select;

class AdvancedSearchForm extends Component {
  render() {

    const { handleSubmit,onSubmit, reset } = this.props;
    
    return (
        <Form 
            onSubmit={onSubmit}
            className="login-form"
        >
            <Row gutter={24}>
                <Col span={8}>
                    {/* <Field
                        name="filter_field"
                        label="Filter by Code"
                        component={ASelect}
                        validate={required}
                        defaultValue="1"
                    >
                        <Option value="ff0000">Red</Option>
                        <Option value="00ff00">Green</Option>
                        <Option value="0000ff">Blue</Option>
                    </Field> */}
                </Col>
                <Col span={8}>
                    {/* <Field
                        name="filter_value"
                        label="Filter by Name"
                        component={ARangePicker}
                        width={4}
                        placeholder={["From", "To"]}
                        hasFeedback
                        onFocus={e => e.preventDefault()}
                        onBlur={e => e.preventDefault()}
                        // validate={required}
                    /> */}
                </Col>
            </Row>

             <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Search</Button>
                    <Button style={{ marginLeft: 8 }} onClick={reset}>
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
  }
}


// AdvancedSearchForm = reduxForm({
//     form: "CreateEmployeeFieldsForm",
// })(AdvancedSearchForm);
  
export default AdvancedSearchForm;

