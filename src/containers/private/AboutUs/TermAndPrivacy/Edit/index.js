// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { withRouter } from "react-router-dom"
import { notification, Icon } from "antd"

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { API_UNI_OIL } from "utils/Api";

class TermAndPrivacyEdit extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
    timerCount: 20,
    isGenerated: false
  }

  async componentDidMount() {

    const { match } = this.props;
    
    try {
      let response = await API_UNI_OIL.get(`TermsAndPrivacy/${match.params.id}`);
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
      this.setState({ mounted: false })
    }
    
  }

  handleEditUserManagement =()=> {
    this.form.submitForm()
  }

  handleSubmit = async (values, actions) => {

    const { setErrors, setSubmitting } = actions;
    const { userInfo } = this.state;
    let { history } = this.props;

    const params = {
      ...values,
      type : userInfo.type
    }

    this.setState({loading: true})
    try {
      const response = await API_PUT(`TermsAndPrivacy/${userInfo.tp_uuid}`, params);    
      if(response.status === 422){
        notification.error({ message: "Success", description: "Something went wrong updating record" });
        setSubmitting(false)
        this.setState({loading: false})
      }else {
        notification.success({ message: "Success", description: "Record Successfully updated" });
        this.setState({loading: false})
        this.props.history.push("/about-us/term-privacy");
      }
    } catch (error) {
      setSubmitting(false)
      this.setState({loading: false})
    }

  }


  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo  } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '30px'}}>
        <HeaderForm 
          loading={loading}
          title="Update Terms"
          action={this.handleEditUserManagement}
          actionBtnName="Update"
          withConfirm={{message: "Save changes to this record?"}}
          cancel={()=> { this.props.history.push("/about-us/term-privacy")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Details</h2>
          <Formik
              initialValues={{
                title: userInfo.title  || '',
                details: userInfo.details || '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
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

export default withRouter(TermAndPrivacyEdit);