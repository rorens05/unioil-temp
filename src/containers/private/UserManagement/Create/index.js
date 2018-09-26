import React, { Component } from 'react'
import { Formik } from 'formik'
import { message } from 'antd';

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import AddUserManagementForm from './components/AddUserManagementForm'

import { API_GET } from "utils/Api";

export default class CreateManagement extends Component {
  state = {
    generated_password: null
  }

  handleSubmit = async (values, actions) => {
    console.log('handleSubmit',values);
    message.success('New record added.');
  }
  handleAddUser =()=> {
    this.form.submitForm()
  }

  generatePassword = async () => {
    try {
      let response = await API_GET('generatePassword')
      console.log(response, 'response123');
    } catch (error) {
      
    }
      console.log('generation ');
  }

  render() {

    const { generated_password } = this.state;

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Add User"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> {console.log('cancel button')}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                username: '',
                generated_password: generated_password ? generated_password : ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddUserManagementForm 
                  {...props}
                  generatePassword={this.generatePassword}
                />
              }
          />
        </div>
      </div>
    )
  }
}
