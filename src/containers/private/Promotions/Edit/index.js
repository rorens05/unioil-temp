// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { notification, message } from "antd"
import moment from 'moment'
 
// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'
 
// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { API_UNI_OIL } from "utils/Api";
import { apiFormValidation } from "utils/helper";



class PromotionsEdit extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
    branchDefaultValue: null,
    branchesOptions: null,
    promoTypeOptions: null,
    responsePromotionTopUp: null
  }

  async componentDidMount() {

    const { match } = this.props;
    let branchDefaultValue = []
    let branchDefaultKeyValue = []
    let promoTypeDefaultValue = []
    let promoTypeDefaultKeyValue = []
    
    try {
      let response = await API_UNI_OIL.get(`promotion/${match.params.id}`);

      let responsePromotionTopUp = await API_UNI_OIL.get(`promotionDisableTopTwo?${match.params.id}`);

      // default options branch
      response.data.data.stations.map(item => {
        branchDefaultValue.push(
          item.description
        )
        branchDefaultKeyValue.push(
          item.station_uuid
        )
      })
      // default options promotype
      
      let promotype = []

      if(response.data.data.promo_type) {
        promotype.push(response.data.data.promo_type)

        promotype.map(item => {
          promoTypeDefaultValue.push(
            item.name
          )
          promoTypeDefaultKeyValue.push(
            item.id
          )
        })
      }

      this.setState({
        userInfo: {...response.data.data},
        mounted: true,
        branchDefaultValue,
        branchDefaultKeyValue,
        promoTypeDefaultValue,
        promoTypeDefaultKeyValue,
        responsePromotionTopUp : responsePromotionTopUp.data && responsePromotionTopUp.data.data.is_toppromotion
      })

      
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong loading data.</div>
        - {error && error.data && error.data.message}
        </div> , 
        duration: 20, 
      });
      if(error.status == 404) {
        if(this.props.location.pathname)
          this.props.history.push(`${this.props.location.pathname}/404`);
      }
      this.setState({ mounted: false })
    }

    // options
    try {

      let branchesOptions = []; let promoTypeOptions = []
      let stationList = await API_GET('getStations');
      let promoTypesList = await API_GET('promoTypes');

      if(stationList) {
        await stationList.data.data.map(item => {
          branchesOptions.push({
            label: item.description,
            value: item.station_uuid,
          })
        })
      }

      if(promoTypesList) {
        for (var property in promoTypesList.data.data) {
          if (promoTypesList.data.data.hasOwnProperty(property)) {
            promoTypeOptions.push({
              label: promoTypesList.data.data[property],
              value: property
            })
          }
        }
      }

      this.setState({
        promoTypeOptions: promoTypeOptions,
        branchesOptions: branchesOptions,
        mounted: true
      })

    } catch ({response: error}) {
     // notification.error({ message: "Error", description: "Something went wrong loading data", duration: 20, });
      this.setState({ mounted: false })
    }

    
  }


  handleSubmit = async (values, actions) => {
    
    const { fileUpload, branchesOptions, userInfo } = this.state;
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

          let branchesList = []
          
          values.station_uuid.map(item => {
            branchesOptions.map(userInfo => {
              if(userInfo.label == item || userInfo.value  == item) {
                branchesList.push(userInfo.value);
              }
            })
          })

          values.station_uuid && (formData.append('station_uuid', JSON.stringify(branchesList)));
          values.title && (formData.append('title', values.title));
          values.description && (formData.append('description', values.description));
          values.date_start && (formData.append('date_start', startDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          values.date_end && (formData.append('date_end', endDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          formData.append('is_toppromotion', values.is_toppromotion ? values.is_toppromotion : 0);
          formData.append('is_gps', values.is_gps ? values.is_gps : 0);
          values.promo_type && (formData.append('promo_type', values.promo_type));
          
          console.log(start_time , 'start_time', values.start_time)
          console.log(end_time , 'end_time' , values.end_time)

          // log formdata
          // for (var pair of formData.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]); 
          // }

          let response = await API_UNI_OIL.post(`updatePromotion/${userInfo.promotion_uuid}`, formData , headers)

          if(response) {
            message.success('Record was successfully update.');  
            this.setState({loading: false})
            history.push({ pathname: "/promotions" })
          }
          
    } catch ({response: error}) {
      if (error.status === 422) {
        apiFormValidation({ data: error.data.data, setErrors });
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

  handleEditPromotions =()=> {
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

    const { loading, userInfo, branchesOptions, promoTypeOptions, branchDefaultValue,
            branchDefaultKeyValue , promoTypeDefaultValue, promoTypeDefaultKeyValue, 
            responsePromotionTopUp } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Update Promotions"
          action={this.handleEditPromotions}
          actionBtnName="Submit"
          withConfirm={{message: "Save changes to this record?"}}
          cancel={()=> this.props.history.push("/promotions")}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Promotions Content Details</h2>
          <Formik
              initialValues={{
                station_uuid: branchDefaultKeyValue  || '',
                title: userInfo.title || '',
                description: userInfo.description || '',
                image: userInfo.image || '',
                date_start: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                date_end: moment( userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') || '',
                start_time: moment(userInfo.date_start, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss') || '',
                end_time: moment(userInfo.date_end, 'YYYY-MM-DDTHH:mm:ss' ).format('HH:mm:ss') || '',
                is_toppromotion: userInfo.is_toppromotion || '',
                is_gps: userInfo.is_gps || '',
                promo_type: promoTypeDefaultKeyValue || '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
                  {...props}
                  branchesOptions={branchesOptions}
                  branchDefaultValue={branchDefaultValue}
                  promoTypeOptions={promoTypeOptions}
                  promoTypeDefaultValue={promoTypeDefaultValue}
                  responsePromotionTopUp={responsePromotionTopUp}
                  handleFileUpload={this.handleFileUpload}
                />
              }
          />
        </div>
      </div>
    )
  }
}


export default PromotionsEdit