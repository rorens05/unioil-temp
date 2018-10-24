// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { message, notification } from 'antd';
import moment from 'moment';
 
// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddPromotionForm from './components/AddPromotionForm'
 
// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api";
import { apiFormValidation } from "utils/helper";



class PromotionsCreate extends Component {
  state = {
    loading: false,
    branchesOptions: null,
    promoTypeOptions: null,
    mounted: false,
    responsePromotionTopUp: null
  }

  async componentDidMount () {

    try {
      let stationList = await API_GET('getStations');

      let promoTypesList = await API_GET('promoTypes');

      let responsePromotionTopUp = await API_UNI_OIL.get(`promotionDisableTopTwo`);

      if(stationList) {

        let branchesOptions = []

        await stationList.data.data.map(item => {
          branchesOptions.push({
            label: item.description,
            value: item.station_uuid
          })
        })

        this.setState({
          branchesOptions: branchesOptions,
          mounted: true,
          responsePromotionTopUp : responsePromotionTopUp.data && responsePromotionTopUp.data.data.is_toppromotion
        })
      }

      if(promoTypesList) {

        let promoTypeOptions = []
        
        for (var property in promoTypesList.data.data) {
          if (promoTypesList.data.data.hasOwnProperty(property)) {
            promoTypeOptions.push({
              label: promoTypesList.data.data[property],
              value: property
            })
          }
        }

        this.setState({
          promoTypeOptions: promoTypeOptions,
          mounted: true
        })
        
      }
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong loading data.</div>
            {error && error.data && (- error.data.message)}
          </div> , 
        duration: 3, 
      });
      this.setState({ mounted: false })
    }
  }

  handleSubmit = async (values, actions) => {
    
    const { fileUpload } = this.state;
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

          let date_end =  moment(values.date_end).format('YYYY-MM-DD');
          let end_time = moment(values.end_time).format('HH:mm:ss');

          let startDateTime = moment(date_start + ' ' + start_time, 'YYYY-MM-DDTHH:mm:ss');
          let endDateTime = moment(date_end + ' ' + end_time, 'YYYY-MM-DDTHH:mm:ss');

          values.station_uuid && (formData.append('station_uuid', JSON.stringify(values.station_uuid)));
          values.title && (formData.append('title', values.title));
          values.description && (formData.append('description', values.description));
          values.date_start && (formData.append('date_start', startDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          values.date_end && (formData.append('date_end', endDateTime.format('YYYY-MM-DDTHH:mm:ss') ) );
          formData.append('is_toppromotion', values.is_toppromotion ? values.is_toppromotion : 0);
          formData.append('is_gps', values.is_gps ? values.is_gps : 0);
          values.promo_type && (formData.append('promo_type', values.promo_type));
          
          let response = await API_UNI_OIL.post('promotion', formData , headers)

          if(response) {
            message.success('New record added.');  
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
          Something went wrong creating new record.
          { error && error.data && error.data.data  && error.data.data.image 
                && (<div>- {error.data.data.image[0]} </div>) }
        </div>
      }); 
      this.setState({loading: false})
    }
    
  }

  handleAddPromotions =()=> {
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

    const { branchesOptions, promoTypeOptions, responsePromotionTopUp, loading } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Promotions"
          action={this.handleAddPromotions}
          actionBtnName="Submit"
          cancel={()=> { this.props.history.push("/promotions")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Promotion Content Details</h2>
          <Formik
              initialValues={{
                station_uuid: '',
                title: '',
                description: '',
                image: '',
                date_start: '',
                date_end: '',
                start_time: '',
                end_time: '',
                is_toppromotion: '',
                is_gps: '',
                promo_type: '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddPromotionForm 
                  {...props}
                  branchesOptions={branchesOptions}
                  promoTypeOptions={promoTypeOptions}
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



export default PromotionsCreate;