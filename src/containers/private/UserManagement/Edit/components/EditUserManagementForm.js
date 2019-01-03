// LIBRARIES
import React, { Fragment } from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';
import HeaderForm from "components/Forms/HeaderForm"

// COMPONENTS
import { Input, Radio } from 'components/Forms';

// HELPER FUNCTIONS

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

function EditUserManagementForm(props) {
  const {
    isSubmitting,
    handleSubmit,
    generatePassword,
    loading,
    isGenerated,
    userInfo,
    history,
    copyActionHandler
  } = props;
  return (
    <Form noValidate>
      <HeaderForm 
        isInsideForm
        loading={loading}
        disabled={props.isValid == false ? true : false}
        title="Update User"
        action={handleSubmit}
        actionBtnName="Submit"
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> { history.push("/user-management")}}
        cancelBtnName="Cancel"
      />
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
        name="email"
        type="text"
        icon="mail"
        layout={formItemLayout}
        label="Email Address"
        placeholder="Email Address"
        component={Input}
      />

      

      {
        userInfo.editable && (
        <Fragment>
          <Field
            name="status"
            icon=""
            //defaultValue={}
            layout={formItemLayout}
            optionsList={[
              {
                label: "Active",
                value: "active"
              },
              {
                label: "Inactive",
                value: "inactive",
              }
            ]}
            label="Status"
            component={Radio}
          />


          <Field
            name="role"
            icon="user"
            layout={formItemLayout}
            optionsList={[
              {
                label: "System Admin",
                value: 1
              },
              {
                label: "Marketing Personnel",
                value: 2,
              }
            ]}
            label="User Role"
            component={Radio}
          />
        </Fragment>
      )}

      <Field
        name="password"
        type="text"
        icon="lock"
        loading={loading}
        withActionBtn={{
          action: ()=>generatePassword(props),
          name: "Generate",
          disabled: userInfo.disable_generate || isGenerated,
          password: props.values.password,
          copyAction: (props.values.password && props.values.password !== "*******************") && (() => copyActionHandler(props))
        }}
        readOnly
        layout={formItemLayout}
        label="Default Password"
        component={Input}
      />

    </Form>
  );
};


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

