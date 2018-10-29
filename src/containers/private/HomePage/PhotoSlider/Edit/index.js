// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import moment from 'moment'
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditPhotoSliderForm from './components/EditPhotoSliderForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { API_UNI_OIL } from "utils/Api";
import { apiFormValidation } from "utils/helper";

class EditPhotoSlider extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
    promotionsDefaultValue: null,
    promotionsDefaultKeyValue: null,
    promotionsOptions: null,
    dateStartEnd: null
  }

  async componentDidMount() {

    const { match } = this.props;
    let promotionsDefaultValue = []
    let promotionsDefaultKeyValue = []
    
    try {
      let response = await API_UNI_OIL.get(`photoSlider/${match.params.id}`);
      // default options branch

      let promotions = []
     
      if(response.data.data.promotion) {
        
        promotions.push({...response.data.data.promotion})

       await promotions.map(item => {
        promotionsDefaultValue.push(
            item.title
          )
        promotionsDefaultKeyValue.push(
            item.promotion_uuid
          )
        })
      }
      // default options promotype
      
      let dateStartEnd = promotions && promotions[0] && { 
          date_start: promotions[0].date_start, 
          date_end: promotions[0].date_end 
      }

      this.setState({
        userInfo: {...response.data.data},
        mounted: true,
        promotionsDefaultValue,
        promotionsDefaultKeyValue,
        dateStartEnd: dateStartEnd
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
      if(error.status == 404) {
        if(this.props.location.pathname) {
          this.props.history.push(`${this.props.location.pathname}/404`);
          return;
        }
      } else {
        this.setState({ mounted: false })
      }
      
    }

    // options
    try {

      let promotionsOptions = []; let promoTypeOptions = []
      let promotionsList = await API_GET('getPromotions');

      if(promotionsList) {
        await promotionsList.data.data.map(item => {
          promotionsOptions.push({
            label: item.title,
            value: item.promotion_uuid,
            date: { dateStart: item.date_start , dateEnd: item.date_end }
          })
        })
      }

      this.setState({
        promotionsOptions: promotionsOptions,
        mounted: true
      })

    } catch ({response: error}) {
      this.setState({ mounted: false })
    }

    
  }

  handleSubmit = async (values, actions) => {
 
    const { fileUpload, branchesOptions, userInfo } = this.state;
    const { history } = this.props;
    const { setErrors } = actions;

    console.log(values, 'valuesvaluesvalues')

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

          if(start_time == 'Invalid date') {
            start_time = values.start_time
          } else {
            start_time = moment(values.start_time).format('HH:mm:ss');
          }

          let date_end =  moment(values.date_end).format('YYYY-MM-DD');
          let end_time = moment(values.end_time).format('HH:mm:ss');

          if(end_time == 'Invalid date') {
            end_time = values.end_time
          } else {
            end_time = moment(values.end_time).format('HH:mm:ss');
          }

          let startDateTime = moment(date_start + ' ' + start_time, 'YYYY-MM-DDTHH:mm:ss');
          let endDateTime = moment(date_end + ' ' + end_time, 'YYYY-MM-DDTHH:mm:ss');

          // let branchesList = []
          
          // values.promotion.map(item => {
          //   branchesOptions.map(userInfo => {
          //     if(userInfo.label == item || userInfo.value  == item) {
          //       branchesList.push(userInfo.value);
          //     }
          //   })
          // })

          values.promotion_uuid && (formData.append('promotion_uuid', values.promotion_uuid ));
          values.title && (formData.append('title', values.title));
          values.description && (formData.append('description', values.description));
          values.date_start && (formData.append('date_start', startDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          values.date_end && (formData.append('date_end', endDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          
          // log formdata
          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]); 
          // }
          let response = await API_UNI_OIL.post(`updatePhotoSlider/${userInfo.photoslider_uuid}`, formData , headers)

          if(response) {
            message.success('Record was successfully update.'); 
            this.setState({loading: false})
            history.push({ pathname: "/home-page/photo-slider" })
          }
          
    } catch ({response: error}) {
      if (error.status === 422) {
        apiFormValidation({ data: error.data.data, setErrors })
      }
      notification.error({ 
        message: 'Error', 
        description: <div>
          Something went wrong updating record.
          { error && error.data && error.data.data  && error.data.data.image 
                && (<div>- {error.data.data.image[0]} </div>) }
        </div>
      }); 
      this.setState({loading: false})
    }
  }

  handleEditPhotoSlider =()=> {
    this.form.submitForm()
  }

  handleFileUpload =(e)=> {
    if (Array.isArray(e)) {
      return this.setState({fileUpload: e});
    }
    return e && this.setState({fileUpload: e.fileList});
  }

  handleGetDate = async (id) => {
    const {promotionsOptions} = this.state;

    if(promotionsOptions) {
      await promotionsOptions.map(item=> {
        if(item.value == id) {
          this.setState({
            dateStartEnd: {
              date_start: item.date.dateStart,
              date_end: item.date.dateEnd
            }
          })
        }
      })
    }

  }

  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo, promotionsOptions, promotionsDefaultValue , promotionsDefaultKeyValue, dateStartEnd  } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Update Photo Slider"
          action={this.handleEditPhotoSlider}
          actionBtnName="Submit"
          withConfirm={{message: "Save changes to this record?"}}
          withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
          cancel={()=> this.props.history.push("/home-page/photo-slider")}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Photo Slider Content Details</h2>
          <Formik
              initialValues={{
                promotion_uuid: promotionsDefaultKeyValue[0]  || '',
                title: userInfo.title || '',
                description: userInfo.description || '',
                image: userInfo.image || '',
                date_start: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                date_end: moment( userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                start_time: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss') || '',
                end_time: moment(userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss' ).format('HH:mm:ss') || '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditPhotoSliderForm 
                  {...props}
                  dateStartEnd={dateStartEnd}
                  promotionsOptions={promotionsOptions}
                  promotionsDefaultValue={promotionsDefaultValue}
                  handleFileUpload={this.handleFileUpload}
                  handleGetDate={this.handleGetDate}
                />
              }
          />
        </div>
      </div>
    )
  }
}


export default EditPhotoSlider