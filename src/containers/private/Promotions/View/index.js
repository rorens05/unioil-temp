// LIBRARIES
import React, { Component } from 'react'
 
// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewUserManagementForm from './components/ViewUserManagementForm'
 
// HELPER FUNCTIONS



export default class UserManagementView extends Component {


  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Promotions Details"
          action={()=> {console.log('update Promotions action button')}}
          actionBtnName="Update"
          deleteAction={()=> {console.log('delete button')}}
          deleteBtnName="Delete"
        />
        <div>
          <ViewUserManagementForm />
        </div>
      </div>
    )
  }
}
