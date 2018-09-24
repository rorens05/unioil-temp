import React, { Component } from 'react'
import HeaderForm from 'components/Forms/HeaderForm'
import ViewUserManagementForm from './components/ViewUserManagementForm'


export default class UserManagementView extends Component {


  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="User Accounts"
          action={()=> {console.log('action button')}}
          actionBtnName="Save"
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
