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
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api";


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
  
    let { history } = this.props;
    let params  = { ...values }
    this.setState({ loading: true });

    try {
      const response = await API_UNI_OIL.post('TermsAndPrivacy', params);
      if(response) {
        message.success("Successfuly create new record" );
        this.setState({ loading: false });
        history.push({ pathname: '/top-up' });
      }
     
    } catch (error) {
      message.error("Something went creating new record.")
      this.setState({ loading: true });
    }
  
}

handleCreateTermPrivacy =()=> {
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
          action={this.handleCreateTermPrivacy}
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