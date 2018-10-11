// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { message } from 'antd';
import { connect } from "react-redux"
import { notification, Icon } from "antd"
 
// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import CreateSystemPreferencesForm from './components/CreateSystemPreferencesForm'
 
// HELPER FUNCTIONS
import { customAction } from "actions";
import { API_GET, API_PUT, API_POST, API_UNI_OIL } from "utils/Api";
import { userDetailsSchema } from './validationSchema'


class CreateSystemPreferences extends Component {
  state = {
    loading: false,
    mounted: false,
    systemPreference: null,
    fileUpload: null
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
          <div>Something went wrong loading data.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
      });
      this.setState({ mounted: false })
    }
    
  }


  handleSubmit = async (values, actions) => {
    
    const { fileUpload } = this.state;


    this.setState({loading: true})
    try {
          const headers = {
            'ContentType': 'multipart/form-data',
          }; 
          const formData = new FormData();
      
          if(fileUpload) {
            fileUpload.forEach((t, i) => {
              formData.append( `logo`, t.originFileObj);
            }); 
          } 
          
          let newNumber = values && values.contact_number_mobile 
              && values.contact_number_mobile && String(values.contact_number_mobile).split(' ').join('')
          
          values.gps && (formData.append('gps', values.gps));
          values.contact_email_address_mobile && (formData.append('contact_email_address_mobile', values.contact_email_address_mobile))
          values.contact_details && (formData.append('contact_details', values.contact_details));
          newNumber && (formData.append('contact_number_mobile', newNumber ));
          
          let response = await API_UNI_OIL.post('systemPreference', formData , headers)

          if(response) {
            message.success('Successful update system parameters.');  
            this.setState({loading: false})
          }
          
        
    } catch ({response: error}) {
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong creating new record.
          { error && error.data && error.data.data  && error.data.data.contact_email_address_mobile 
                && (<div>- {error.data.data.contact_email_address_mobile[0]} </div>) }
          { error && error.data && error.data.data && error.data.data.contact_number_mobile
               && (<div>- {error.data.data.contact_number_mobile[0]} </div>) }
        </div>
      }); 
      this.setState({loading: false})
    }
    
  }

  handleAddUser =()=> {
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

    const { systemPreference, loading } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="System Parameters"
          action={this.handleAddUser}
          loading={loading}
          actionBtnName="Save"
          // cancel={()=> {console.log('cancel button')}}
          // cancelBtnName="Cancel"
        />
        <div>
          <Formik
              initialValues={{
                logo: systemPreference.logo || '',
                gps: systemPreference.gps || '',
                contact_email_address_mobile: systemPreference.contact_email_address_mobile || '',
                contact_number_mobile: systemPreference.contact_number_mobile || '',
                contact_details: systemPreference.contact_details  || '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <CreateSystemPreferencesForm 
                  {...props}
                  handleFileUpload={this.handleFileUpload}
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