import React, { Component } from 'react'
import LockAccountViewForm from './components/LockAccountViewForm'
import HeaderForm from "components/Forms/HeaderForm";

export default class LockAccountView extends Component {


  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Locked Accounts"
          action={()=> {console.log('activate account')}}
          actionBtnName="Activate Account"
        />
        <div>
          <LockAccountViewForm />
        </div>
      </div>
    )
  }
}
