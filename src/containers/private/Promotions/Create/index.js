import React, { Component } from 'react'
import { Formik } from 'formik'
import { message } from 'antd';

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import AddUserManagementForm from './components/AddUserManagementForm'

export default class CreateManagement extends Component {

  handleSubmit = async (values, actions) => {
    console.log('handleSubmit',values);
    message.success('New record added.');
  }
  handleAddUser =()=> {
    this.form.submitForm()
  }

  render() {
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Promotions"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> {console.log('cancel button')}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Promotion Content Details</h2>
          <Formik
              initialValues={{
                username: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddUserManagementForm 
                  {...props}
                />
              }
          />
        </div>
      </div>
    )
  }
}
