import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Input, Radio } from 'components/Forms';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

function AddPhotoSliderForm(props) {
  const {
    isSubmitting,
    handleSubmit
  } = props;

  return (
    <Form noValidate>

      <Field
        name="username"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="Username"
        placeholder="User name"
        component={Input}
      />

      <Field
        name="firstname"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="First Name"
        placeholder="First Name"
        component={Input}
      />

      <Field
        name="lastname"
        type="text"
        icon="user"
        layout={formItemLayout}
        label="Last Name"
        placeholder="Last Name"
        component={Input}
      />

      <Field
        name="email_address"
        type="email"
        icon="mail"
        layout={formItemLayout}
        label="Email Address"
        placeholder="Email Address"
        component={Input}
      />

      <Field
        name="user_role"
        icon="user"
        layout={formItemLayout}
        optionsList={[
          {
            label: "System Admin",
            value: "1"
          },
          {
            label: "Marketing Personnel",
            value: "2",
          }
        ]}
        label="User Role"
        component={Radio}
      />

      <Field
        name="generated_password"
        type="text"
        icon=""
        withActionBtn={{
          action: ()=> { console.log('helow world') },
          name: "Generate"
        }}
        layout={formItemLayout}
        label="Deafult Password"
        component={Input}
      />
      
    </Form>
  );
};


AddPhotoSliderForm = connect(
  state => ({
    
  }),
)(AddPhotoSliderForm);


export default AddPhotoSliderForm;

