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



class EditPhotoSlider extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
    branchDefaultValue: null,
    branchesOptions: null
  }

  async componentDidMount() {

    const { match } = this.props;
    let branchDefaultValue = []
    let branchDefaultKeyValue = []
    
    try {
      let response = await API_UNI_OIL.get(`photoSlider/${match.params.id}`);
      // default options branch
      if(response.data.data.promotions) {
        response.data.data.promotions.map(item => {
          branchDefaultValue.push(
            item.title
          )
          branchDefaultKeyValue.push(
            item.promotion_uuid
          )
        })
      }
      // default options promotype

      this.setState({
        userInfo: {...response.data.data},
        mounted: true,
        branchDefaultValue,
        branchDefaultKeyValue,
      })

      
    } catch ({response: error}) {
      //notification.error({ message: "Error", description: error.data.message , duration: 20, });
      notification.error({ message: "Error", description: "Something went wrong loading data", duration: 20, });
      this.setState({ mounted: false })
    }

    // options
    try {

      let branchesOptions = []; let promoTypeOptions = []
      let stationList = await API_GET('getStations');

      if(stationList) {
        await stationList.data.data.map(item => {
          branchesOptions.push({
            label: item.description,
            value: item.station_uuid,
          })
        })
      }

      this.setState({
        branchesOptions: branchesOptions,
        mounted: true
      })

    } catch ({response: error}) {
     // notification.error({ message: "Error", description: "Something went wrong loading data", duration: 20, });
      this.setState({ mounted: false })
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

  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo, branchesOptions, branchDefaultValue , branchDefaultKeyValue  } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Update Photo Slider"
          action={this.handleEditPhotoSlider}
          actionBtnName="Update"
          withConfirm={{message: "Save changes to this record?"}}
          cancel={()=> this.props.history.push("/home-page/photo-slider")}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Photo Slider Content Details</h2>
          <Formik
              initialValues={{
                promotion_uuid: branchDefaultKeyValue  || '',
                title: userInfo.title || '',
                description: userInfo.description || '',
                image: userInfo.image || '',
                date_start: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                date_end: moment( userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                start_time: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss') || '',
                end_time: moment(userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss' ).format('HH:mm:ss') || '',
              }}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditPhotoSliderForm 
                  {...props}
                  branchesOptions={branchesOptions}
                  branchDefaultValue={branchDefaultValue}
                  handleFileUpload={this.handleFileUpload}
                />
              }
          />
        </div>
      </div>
    )
  }
}


export default EditPhotoSlider