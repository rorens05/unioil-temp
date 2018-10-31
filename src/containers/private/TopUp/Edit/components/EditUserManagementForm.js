// LIBRARIES
import React from 'react';
import { Row, Button, Col } from 'antd';
import { Form, Field } from 'formik';
import { connect } from 'react-redux';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import { Input, InputNumberAntD, Radio } from 'components/Forms';

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
    generatePassword,
    loading,
    handleSubmit,
    isGenerated,
    handleResetValue,
    history
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
        withConfirm={{message: "Save changes to this record?"}}
        withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
        cancel={()=> { history.push("/top-up")}}
        cancelBtnName="Cancel"
      />
      <Field
        name="fee_code"
        type="text"
        //icon="user"
        disabled
        layout={formItemLayout}
        label="Fee Code"
        placeholder="Fee Code"
        component={Input}
      />

      <Field
        name="name"
        type="text"
        //icon="user"
        layout={formItemLayout}
        label="Name"
        placeholder="Name"
        component={Input}
      />

      {
        props.values.type == "" || props.values.type == 1 ? 
          <Field
            name="amount"
            //icon="user"
            layout={formItemLayout}
            label="Value"
            placeholder="Value"
            min={0}
            max={99999.99}
            step={0.01}
            component={InputNumberAntD}
          /> :
          <Field
            name="amount"
            //icon="user"
            layout={formItemLayout}
            label="Value"
            placeholder="Value"
            min={0}
            max={100} 
            component={InputNumberAntD}
          />
      } 

      <Field
        name="type"
        icon="user"
        layout={formItemLayout}
        defaultValue={props.values.type}
        isRadioButton
        optionsList={[
          { label: "PH Peso", value: 1, },
          { label: "Percentage ", value: 2 }
        ]}
        label="Type"
        component={Radio}
        handleResetValue={handleResetValue}
      />

    </Form>
  );
};


EditUserManagementForm = connect(
  state => ({
    
  }),
)(EditUserManagementForm);


export default EditUserManagementForm;

