import React, { Component } from 'react'
import HeaderForm from 'components/Forms/HeaderForm'
import ViewUserManagementForm from './components/ViewUserManagementForm'


export default class UserManagementView extends Component {


  render() {

    const { history, match } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="User Accounts"
          action={()=> {this.props.history.push(`/user-management/edit/${match.params.id}`)}}
          actionBtnName="Update"
          styleBtn={{background: 'white', borderColor: 'rgb(184, 187, 201)',color: 'rgb(101, 105, 127)'}}
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
