// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { withRouter } from "react-router-dom"
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { API_UNI_OIL } from "utils/Api";

class TopUpEdit extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
  }

  async componentDidMount() {

    const { match } = this.props;
    
    try {
      let response = await API_UNI_OIL.get(`cardType/${match.params.id}`);
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
      this.setState({ mounted: false })
    }
    
  }

  handleSubmit = async (values, actions) => {
    
    const { fileUpload, userInfo } = this.state;
    const { history } = this.props;


    this.setState({loading: true})
    try {
          const headers = {
            'ContentType': 'multipart/form-data',
          }; 
          const formData = new FormData();
      
          if(fileUpload) {
            fileUpload.forEach((t, i) => {
              formData.append( `image`, t.originFileObj);
            }); 
          } 
          
          
          values.code && (formData.append('code', values.code));
          values.type && (formData.append('type', values.type));
          values.description && (formData.append('description', values.description));
          values.terms_and_conditions && (formData.append('terms_and_conditions', values.terms_and_conditions));
          values.faqs && (formData.append('faqs', values.faqs));
          

          let response = await API_UNI_OIL.post(`cardTypeUpdate/${userInfo.cardtype_uuid}`, formData , headers)

          if(response) {
            message.success('Successful update record.');  
            this.setState({loading: false})
            history.push({ pathname: "/about-us/card-types" })
          }
          
        
    } catch ({response: error}) {
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong creating new user.
          {
            error.data && error.data.data  && error.data.data.image 
                && (<div>- {error.data.data.image[0]} </div>) 
          }
        </div>
      }); 
      this.setState({loading: false})
    }
    
  }

  handleEditCardTypes =()=> {
    this.form.submitForm()
  }

  handleFileUpload =(e)=> {
    if (Array.isArray(e)) {
      return this.setState({fileUpload: e});
    }
    return e && this.setState({fileUpload: e.fileList});
  }

  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Update Card Type"
          action={this.handleEditCardTypes}
          actionBtnName="Update"
          withConfirm={{message: "Save changes to this record?"}}
          cancel={()=> { this.props.history.push("/about-us/card-types")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                code: userInfo.code  || '',
                type: userInfo.name || '',
                description: userInfo.description || '',
                image: userInfo.image || '',
                terms_and_conditions: userInfo.terms_and_conditions || '',
                faqs: userInfo.faqs || '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
                  {...props}
                  loading={loading}
                  handleFileUpload={this.handleFileUpload}
                />
              }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(TopUpEdit);