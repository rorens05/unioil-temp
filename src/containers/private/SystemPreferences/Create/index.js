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
import { apiFormValidation } from "utils/helper";
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
        duration: 3, 
      });
      this.setState({ mounted: false })
    }
    
  }


  handleSubmit = async (values, actions) => {
    
    const { fileUpload } = this.state;
    const { setSubmitting, setErrors } = actions;

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
          values.information_guide_details && (formData.append('information_guide_details', values.information_guide_details));
          
          let response = await API_UNI_OIL.post('systemPreference', formData , headers)

          if(response) {
            message.success('Record was successfully update.');  
            this.setState({loading: false})
          }
          
        
    } catch ({response: error}) {
      if (error.status === 422) {
        apiFormValidation({ data: error.data.data, setErrors });
      }
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
      setSubmitting(false);
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

  syncStratuscast = async () => {
    
    this.setState({loading: true})
    try {
      let stratuscastAboutUs = await API_UNI_OIL.get('stratuscastAboutUs')
    } catch (error) {
      // notification.error({ 
      //   message: 'Error', 
      //   description: <div>
      //     Something went wrong in Stratuscast About Us.
      //   </div>
      // });
    }

    try {
      let stratuscastCityProvince = await API_UNI_OIL.get('stratuscastCityProvince')
    } catch (error) {
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong in Stratuscast City Province.
        </div>
      });
    }

    try {
      let stratuscastProducts = await API_UNI_OIL.get('stratuscastProducts')
    } catch (error) {
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong in Stratuscast Products.
        </div>
      });
    }

    try {
      let stratuscastStation = await API_UNI_OIL.get('stratuscastStation')
    } catch (error) {
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong in Stratuscast Station.
        </div>
      });
    }

    message.success('Successfully Sync Data.');
    this.setState({loading: false})
  }

  render() {

    

    if(!this.state.mounted) return null;

    const { systemPreference, loading } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        {/* <HeaderForm 
          loading={loading}
          title="System Parameters"
          action={this.handleAddUser}
          actionBtnName="Submit"
          // cancel={()=> {console.log('cancel button')}}
          // cancelBtnName="Cancel"
        /> */}
        <div>
          <Formik
              initialValues={{
                logo: systemPreference.logo || '',
                gps: systemPreference.gps || '',
                contact_email_address_mobile: systemPreference.contact_email_address_mobile || '',
                contact_number_mobile: systemPreference.contact_number_mobile || '',
                contact_details: systemPreference.contact_details  || '',
                information_guide_details: systemPreference.information_guide_details || ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <CreateSystemPreferencesForm 
                  {...props}
                  loading={loading}
                  handleFileUpload={this.handleFileUpload}
                  syncStratuscast={this.syncStratuscast}
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