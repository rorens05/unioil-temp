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
import { apiFormValidation } from "utils/helper"


class CreatePhotoSlider extends Component {
  state = {
    loading: false,
    promotionsOptions: null,
    mounted: false,
    photoSliderLimit: false,
    dateStartEnd: null
  }

  async componentDidMount() {

    try {
      let photoSlider = await API_UNI_OIL('photoSliderCount');
      if(photoSlider)
        this.setState({photoSliderLimit: false})
    } catch ({response:error}) {
      this.setState({photoSliderLimit: true})
    }


    try {
      let promotionsList = await API_GET('getPromotions');

      if (promotionsList) {

        let promotionsOptions = []

        await promotionsList.data.data.map(item => {
          promotionsOptions.push({
            label: item.title,
            value: item.promotion_uuid,
            date: { dateStart: item.date_start , dateEnd: item.date_end }
          })
        })

        this.setState({
          promotionsOptions: promotionsOptions,
          mounted: true
        })
      }

    } catch ({ response: error }) {
      notification.error({
        message: "Error",
        description: <div>
          <div>Something went wrong loading data.</div>
          - {error && error.data && error.data.message}
        </div>,
        duration: 3,
      });
      this.setState({ mounted: false })
    }
  }

  handleSubmit = async (values, actions) => {

    const { fileUpload } = this.state;
    const { history } = this.props;
    const { setErrors } = actions;

    this.setState({ loading: true })
    try {
      const headers = {
        'ContentType': 'multipart/form-data',
      };
      const formData = new FormData();

      if (fileUpload) {
        fileUpload.forEach((t, i) => {
          formData.append(`image`, t.originFileObj);
        });
      } else {
        if(values.image) {
          let imageUrlPath = values.image
          formData.append(`image`, imageUrlPath);
        }
      }
      
      let date_start = moment(values.date_start).format('YYYY-MM-DD');
      let start_time = moment(values.start_time).format('HH:mm:ss');


      if(start_time == 'Invalid date') {
        start_time = values.start_time
      } else {
        start_time = moment(values.start_time).format('HH:mm:ss');
      }

      let date_end = moment(values.date_end).format('YYYY-MM-DD');
      let end_time = moment(values.end_time).format('HH:mm:ss');

      if(end_time == 'Invalid date') {
        end_time = values.end_time
      } else {
        end_time = moment(values.end_time).format('HH:mm:ss');
      }

      let startDateTime = moment(date_start + ' ' + start_time, 'YYYY-MM-DDTHH:mm:ss');
      let endDateTime = moment(date_end + ' ' + end_time, 'YYYY-MM-DDTHH:mm:ss');

      values.promotion_uuid && (formData.append('promotion_uuid', values.promotion_uuid));
      values.title && (formData.append('title', values.title));
      values.description && (formData.append('description', values.description));
      values.date_start && (formData.append('date_start', startDateTime.format('YYYY-MM-DDTHH:mm:ss')));
      values.date_end && (formData.append('date_end', endDateTime.format('YYYY-MM-DDTHH:mm:ss')));

      let response = await API_UNI_OIL.post('photoSlider', formData, headers)

      if (response) {
        message.success('New record added.');
        this.setState({ loading: false })
        history.push({ pathname: "/home-page/photo-slider" })
      }

    } catch ({ response: error }) {
      if (error.status === 422) {
        apiFormValidation({ data: error.data.data, setErrors })
      }
      notification.error({
        message: 'Error',
        description: <div>
          Something went wrong creating new record.
          {error && error.data && error.data.data && error.data.data.image
            && (<div>- {error.data.data.image[0]} </div>)}
        </div>
      });
      this.setState({ loading: false })
    }
  }

  handleAddPhotoSlider = () => {
    this.form.submitForm()
  }

  handleFileUpload = (e) => {
    if (Array.isArray(e)) {
      return this.setState({ fileUpload: e });
    }
    return e && this.setState({ fileUpload: e.fileList });
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

  handleAutoFillDeatils = async (id,setFieldValue) => {
  
    if(id) {

      try {
        let promotionsList = await API_GET(`promotion/${id}`);
        let autofillData = {
          ...promotionsList.data.data
        }

        setFieldValue('title', autofillData.title);
        setFieldValue('description', autofillData.description);
        setFieldValue('image', `${autofillData.image}`);
        setFieldValue('date_start',  moment(autofillData.date_start, 'YYYY-MM-DDTHH:mm'));
        setFieldValue('date_end',  moment(autofillData.date_end, 'YYYY-MM-DDTHH:mm'));
        setFieldValue('start_time',  moment(autofillData.date_start, 'YYYY-MM-DDTHH:mm').format('HH:mm') );
        setFieldValue('end_time',  moment(autofillData.date_end, 'YYYY-MM-DDTHH:mm').format('HH:mm') );
       
        this.setState({
          isAutofill: true
        })
        
      } catch ({response: error}) {
        notification.error({
          message: 'Error',
          description: <div>
            Something went wrong autofill records.
            - {error && error.data && error.data.message}
          </div>
        });
      }
    }

  }

  render() {

    if (!this.state.mounted) return null;

    const { loading, promotionsOptions, photoSliderLimit, dateStartEnd } = this.state

    return (
      <div style={{ border: '1px solid #E6ECF5', paddingBottom: '10px' }}>
        {/* <HeaderForm
          loading={loading}
          title="Photo Slider"
          action={this.handleAddPhotoSlider}
          disabled={photoSliderLimit}
          actionBtnName="Submit"
          withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
          cancel={() => { this.props.history.push("/home-page/photo-slider") }}
          cancelBtnName="Cancel"
        /> */}
        <div>
          <h2 style={{ margin: '25px 35px' }}>Photo Slider Content Details</h2>
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
            onSubmit={this.handleSubmit}
            render={(props) =>
              <AddPhotoSliderForm
                {...props}
                loading={loading}
                history={this.props.history}
                photoSliderLimit={photoSliderLimit}
                promotionsOptions={promotionsOptions}
                handleGetDate={this.handleGetDate}
                dateStartEnd={dateStartEnd}
                handleFileUpload={this.handleFileUpload}
                handleAutoFillDeatils={this.handleAutoFillDeatils}
              />
            }
          />
        </div>
      </div>
    )
  }
}


export default CreatePhotoSlider