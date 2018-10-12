// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { message, notification } from 'antd'
import moment from 'moment'

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddPhotoSliderForm from './components/AddPhotoSliderForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api"


class CreatePhotoSlider extends Component {
  state = {
    promotionsOptions: null,
    mounted: false
  }

  async componentDidMount () {
    try {
      let promotionsList = await API_GET('getPromotions');

      if(promotionsList) {

        let promotionsOptions = []

        await promotionsList.data.data.map(item => {
          promotionsOptions.push({
            label: item.title,
            value: item.promotion_uuid
          })
        })

        this.setState({
          promotionsOptions: promotionsOptions,
          mounted: true
        })
      }

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

          let date_start =  moment(values.date_start).format('YYYY-MM-DD');
          let start_time = moment(values.start_time).format('HH:mm:ss');

          let date_end =  moment(values.date_end).format('YYYY-MM-DD');
          let end_time = moment(values.end_time).format('HH:mm:ss');

          let startDateTime = moment(date_start + ' ' + start_time, 'YYYY-MM-DDTHH:mm:ss');
          let endDateTime = moment(date_end + ' ' + end_time, 'YYYY-MM-DDTHH:mm:ss');

          values.promotion_uuid && (formData.append('promotion_uuid', values.promotion_uuid ));
          values.title && (formData.append('title', values.title));
          values.description && (formData.append('description', values.description));
          values.date_start && (formData.append('date_start', startDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          values.date_end && (formData.append('date_end', endDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
        
          let response = await API_UNI_OIL.post('photoSlider', formData , headers)

          if(response) {
            message.success('New record added.');   
            this.setState({loading: false})
            history.push({ pathname: "/home-page/photo-slider" })
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

  handleAddPhotoSlider =()=> {
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

    const { promotionsOptions } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Photo Slider"
          action={this.handleAddPhotoSlider}
          actionBtnName="Submit"
          cancel={()=> { this.props.history.push("/home-page/photo-slider")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Photo Slider Content Details</h2>
          <Formik
              initialValues={{
                promotion_uuid: '',
                title: '',
                description: '',
                image: '',
                date_start: '',
                date_end: '',
                start_time: '',
                end_time: '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddPhotoSliderForm 
                  {...props}
                  promotionsOptions={promotionsOptions}
                  handleFileUpload={this.handleFileUpload}
                />
              }
          />
        </div>
      </div>
    )
  }
}


export default CreatePhotoSlider