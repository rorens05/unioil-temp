// LIBRARIES
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Formik } from 'formik'
import { message,notification } from 'antd';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddCardForm from './components/AddCardForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { customAction } from "actions";
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api";
import { apiFormValidation } from "utils/helper";


class CardTypeCreate extends Component {
  state = {
    generated_password: null,
    userInfo: null,
    loading: false,
    fileUpload: null,
    fileUploadBackground: null
  }

  componentDidMount() {

  }

  handleSubmit = async (values, actions) => {
    
    const { fileUpload, fileUploadBackground } = this.state;
    const { history } = this.props;
    const { setErrors } = actions;

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
          if(fileUploadBackground) {
            fileUploadBackground.forEach((t, i) => {
              formData.append( `bg_image`, t.originFileObj);
            }); 
          } 
          
          if(values.id_number == 1) {
            values.id_number = 1;
          } else {
            values.id_number = 0;
          }
          values.code && (formData.append('code', values.code));
          values.type && (formData.append('type', values.type));
          values.description && (formData.append('description', values.description));
          values.terms_and_conditions && (formData.append('terms_and_conditions', values.terms_and_conditions));
          values.faqs && (formData.append('faqs', values.faqs));
          formData.append('id_number', values.id_number);
          values.id_number_description && (formData.append('id_number_description', values.id_number_description));
          
          let response = await API_UNI_OIL.post('cardType', formData , headers)

          if(response) {
            message.success('New record added.');  
            this.setState({loading: false})
            history.push({ pathname: "/about-us/card-types" })
          }
          
    } catch ({response: error}) {
      if (error.status === 422) {
        apiFormValidation({ data: error.data.data, setErrors });
      }
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong creating new record.
          { error && error.data && error.data.data  && error.data.data.image 
                && (<div>- {error.data.data.image[0]} </div>) }
        </div>
      }); 
      this.setState({loading: false})
    }
    
  }

  
  handleAddCardTypes =()=> {
    this.form.submitForm()
  }

  handleFileUpload =(e)=> {
    if (Array.isArray(e)) {
      return this.setState({fileUpload: e});
    }
    return e && this.setState({fileUpload: e.fileList});
  }

  handleFileUploadBackground =(e)=> {
    if (Array.isArray(e)) {
      return this.setState({fileUploadBackground: e});
    }
    return e && this.setState({fileUploadBackground: e.fileList});
  }

  

  render() {
    const { userManagement } = this.props
    const { loading, isGenerated } = this.state;
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        {/* <HeaderForm 
          loading={loading}
          title="Card Types"
          action={this.handleAddCardTypes}
          actionBtnName="Submit"
          withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
          cancel={()=> {this.props.history.push("/about-us/card-types")}}
          cancelBtnName="Cancel"
        /> */}
        <div>
          <h2 style={{margin: '25px 35px'}}>Card Type Details</h2>
          <Formik
              initialValues={{
                code: '',
                type: '',
                description: '',
                image: '',
                terms_and_conditions: '',
                faqs: '',
                id_number: '',
                id_number_description: '',
                bg_image: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddCardForm 
                  {...props}
                  loading={loading}
                  history={this.props.history}
                  handleFileUpload={this.handleFileUpload}
                  handleFileUploadBackground={this.handleFileUploadBackground}
                />
              }
          />
        </div>
      </div>
    )
  }
}


CardTypeCreate = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(CardTypeCreate);

export default CardTypeCreate;