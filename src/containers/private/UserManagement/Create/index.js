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


class CreateUserManagement extends Component {
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
    this.setState({loading: true})
    values.role = parseInt(values.role);
    if(values.status) {
      values.status = values.status
    } else { 
      values.status = "active"
    }


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
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong generating password.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 3, 
      });
      this.setState({loading: false})
    }
  }

  copyActionHandler = (props) => {
    if(props.values.password) {
      //navigator.clipboard.writeText(props.values.password);
      window.copyTextHandler(props.values.password)
    }
  }

  render() {
    const { userManagement } = this.props
    const { loading, isGenerated } = this.state;
 
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        {/* <HeaderForm 
          loading={loading}
          disabled={isFormValid == false ? true : false}
          title="Add User"
          action={this.handleAddUser}
          actionBtnName="Submit"
          withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
          cancel={()=> { this.props.history.push("/user-management")}}
          cancelBtnName="Cancel"
        /> */}
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                email: '',
                role: '',
                status: "active"
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddUserManagementForm 
                  {...props}
                  history={this.props.history}
                  loading={userManagement.createRequestPending || loading}
                  generatePassword={this.generatePassword}
                  isGenerated={isGenerated}
                  copyActionHandler={this.copyActionHandler}
                />
              }
          />
        </div>
      </div>
    )
  }
}


CreateUserManagement = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(CreateUserManagement);

export default CreateUserManagement;