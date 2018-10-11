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


class CardTypeCreate extends Component {
  state = {
    generated_password: null,
    userInfo: null,
    loading: false,
    fileUpload: null
  }

  componentDidMount() {

  }

  handleSubmit = async (values, actions) => {
    
    const { fileUpload } = this.state;
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
          
          let response = await API_UNI_OIL.post('cardType', formData , headers)

          if(response) {
            message.success('New record added.');  
            this.setState({loading: false})
            history.push({ pathname: "/about-us/card-types" })
          }
          
    } catch ({response: error}) {
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

  render() {
    const { userManagement } = this.props
    const { loading, isGenerated } = this.state;
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Card Types"
          action={this.handleAddCardTypes}
          actionBtnName="Save"
          cancel={()=> { this.props.history.push("/about-us")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Card Type Details</h2>
          <Formik
              initialValues={{
                code: '',
                type: '',
                description: '',
                image: '',
                terms_and_conditions: '',
                faqs: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddCardForm 
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


CardTypeCreate = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(CardTypeCreate);

export default CardTypeCreate;