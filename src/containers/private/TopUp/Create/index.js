import React, { Component } from 'react'
import { connect } from "react-redux"
import { Formik } from 'formik'
import { message,notification } from 'antd';

import { userDetailsSchema } from './validationSchema'
import HeaderForm from "components/Forms/HeaderForm"
import AddUserManagementForm from './components/AddUserManagementForm'

import { API_GET, API_POST } from "utils/Api";
// HELPER FUNCTIONS
import { customAction } from "actions";


class TopUpCreate extends Component {
  state = {
    generated_password: null,
    userInfo: null,
    loading: false,
    isGenerated: false
  }

  componentDidMount() {

  }

  handleSubmit = async (values, actions) => {

    const { setErrors, setSubmitting } = actions;
    let { history } = this.props;
    let _self = this; 
    this.setState({loading: true, isGenerated: false})
    values.role = parseInt(values.role);

    this.props.customAction({
      type: "USERMANAGEMENT_CREATE_REQUEST",
      payload: {
        values,
        setSubmitting,
        setErrors,
        history,
        _self
      }
    });
  }
  
  handleAddUser =()=> {
    this.form.submitForm()
  }

  generatePassword = async (props) => {

    this.setState({loading: true})

    try {
      let adminProfile = await API_POST('adminProfile'); 
      let userInfo = { ...adminProfile.data.data[0]}
      let response = await API_POST('generatePassword', userInfo.admin_uuid)
      if(response) {
        props.setValues({...props.values, password: response.data.data.password})
        this.setState({loading: false, isGenerated: true})
      }
    } catch ({response:error}) {
      notification.error({ message: 'Error', description: "Something went wrong generating password."})
      this.setState({loading: false})
    }
  }

  render() {
    const { userManagement } = this.props
    const { loading, isGenerated } = this.state;
    
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
                  loading={userManagement.createRequestPending || loading}
                  generatePassword={this.generatePassword}
                  isGenerated={isGenerated}
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