// LIBRARIES
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Formik } from 'formik'
import { message,notification } from 'antd';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddUserManagementForm from './components/AddUserManagementForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { customAction } from "actions";
import { API_GET, API_POST } from "utils/Api";


class TermAndPrivacyCreate extends Component {
  state = {
    generated_password: null,
    userInfo: null,
    loading: false,
    isGenerated: false
  }

  componentDidMount() {

  }

  handleSubmit = async (values, actions) => {

  }
  
  handleAddUser =()=> {
    this.form.submitForm()
  }

  render() {
    const { userManagement } = this.props
    const { loading, isGenerated } = this.state;
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Add User"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> { this.props.history.push("/user-management")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                email: '',
                role: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddUserManagementForm 
                  {...props}
                  loading={userManagement.createRequestPending || loading}
                  isGenerated={isGenerated}
                />
              }
          />
        </div>
      </div>
    )
  }
}


TermAndPrivacyCreate = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(TermAndPrivacyCreate);

export default TermAndPrivacyCreate;