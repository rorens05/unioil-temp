import React, { Component } from 'react'
import { Formik } from 'formik'
import { message } from 'antd';

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import CreateSystemPreferencesForm from './components/CreateSystemPreferencesForm'

export default class CreateSystemPreferences extends Component {

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
          title="System Preferences"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> {console.log('cancel button')}}
          cancelBtnName="Cancel"
        />
        <div>
          <Formik
              initialValues={{
                title: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <CreateSystemPreferencesForm 
                  {...props}
                />
              }
          />
        </div>
      </div>
    )
  }
}
