// LIBRARIES
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Formik } from 'formik'
import { message,notification } from 'antd';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddUserManagementForm from './components/AddUserManagementForm'

// HELPER FUNCTIONS
import { API_GET, API_POST } from "utils/Api";
import { customAction } from "actions";
import { userDetailsSchema } from './validationSchema'


class TopUpCreate extends Component {
  state = {
    userInfo: null,
    loading: false,
  }

  componentDidMount() {

  }

  handleSubmit = async (values, actions) => {

  }
  
  handleAddUser =()=> {
    this.form.submitForm()
  }

  render() {

    const { loading } = this.state;
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Top-Up"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> { this.props.history.push("/top-up")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Top-Up Details</h2>
          <Formik
              initialValues={{
                fee_code: '',
                name: '',
                amount: '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddUserManagementForm 
                  {...props}
                  loading={loading}
                />
              }
          />
        </div>
      </div>
    )
  }
}


TopUpCreate = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(TopUpCreate);

export default TopUpCreate;