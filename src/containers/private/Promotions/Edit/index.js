import React, { Component } from 'react'
import { Formik } from 'formik'

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'

export default class EditManagement extends Component {

  handleSubmit =()=> {
    console.log('handleSubmit');
  }

  render() {
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Update User"
          action={()=> {console.log('action button')}}
          actionBtnName="Save"
          cancel={()=> {console.log('cancel button')}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{}}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
                  {...props}
                />
              }
          />
        </div>
      </div>
    )
  }
}
