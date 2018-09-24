import React, { Component } from 'react'
import HeaderForm from 'components/Forms/HeaderForm'
import CardMemberViewForm from './components/CardMemberViewForm'


export default class CardMemberView extends Component {


  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Card Member Details"
        />
        <div>
          <CardMemberViewForm />
        </div>
      </div>
    )
  }
}
