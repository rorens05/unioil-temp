import React, { Component } from 'react'
import { Formik } from 'formik'
import { message } from 'antd';
import { connect } from "react-redux"
import { notification, Icon } from "antd"

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import CreateSystemPreferencesForm from './components/CreateSystemPreferencesForm'

// HELPER FUNCTIONS
import { customAction } from "actions";
import { API_GET, API_PUT, API_POST, API_UNI_OIL } from "utils/Api";

class CreateSystemPreferences extends Component {
  state = {
    loading: false,
    mounted: false,
    systemPreference: null
  }

  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`systemPreference`) 
      this.setState({
        systemPreference: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
      });
      this.setState({ mounted: false })
    }
    
  }

  handleSubmit = async (values, actions) => {
    console.log('handleSubmit',values);
    message.success('New record added.');
  }
  handleAddUser =()=> {
    this.form.submitForm()
  }

  render() {

    

    if(!this.state.mounted) return null;

    const { systemPreference } = this.state

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
                title: systemPreference.username  || '',
                password: systemPreference.password || '',
                firstname: systemPreference.firstname || '',
                lastname: systemPreference.lastname || '',
                email: systemPreference.email || '',
                role: systemPreference.role || ''
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


CreateSystemPreferences = connect(
  state => ({
    //userInfo: state
    //userManagement: state.userManagement,
  }),
  { customAction }
)(CreateSystemPreferences);

export default CreateSystemPreferences;