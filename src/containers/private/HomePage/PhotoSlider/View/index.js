// LIBRARIES
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewPhotoSliderForm from './components/ViewPhotoSliderForm'

// HELPER FUNCTIONS


export default class PhotoSliderView extends Component {


  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Photo Slider Accounts"
          action={()=> {console.log('action button')}}
          actionBtnName="Update"
          deleteAction={()=> {console.log('delete button')}}
          deleteBtnName="Delete"
        />
        <div>
          <ViewPhotoSliderForm />
        </div>
      </div>
    )
  }
}
