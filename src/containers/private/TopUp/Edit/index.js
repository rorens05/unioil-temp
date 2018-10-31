// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { withRouter } from "react-router-dom"
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { apiFormValidation } from "utils/helper";
import { API_UNI_OIL } from "utils/Api";

class TopUpEdit extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
  }

  async componentDidMount() {

    const { match } = this.props;
    
    try {
      let response = await API_UNI_OIL.get(`topUp/${match.params.id}`);
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong loading data.</div>
        - {error && error.data && error.data.message}
        </div> , 
        duration: 3, 
      });
      if(error.status == 404) {
        if(this.props.location.pathname)
          this.props.history.push(`${this.props.location.pathname}/404`); return
      }
      this.setState({ mounted: false })
    }
    
  }

  handleEditUserManagement =()=> {
    this.form.submitForm()
  }

  handleSubmit = async (values, actions) => {

    const { setErrors, setSubmitting } = actions;
    const { userInfo } = this.state;
    let { history } = this.props;

    const params = {
      ...values,
    }

    if(params.type) {
      params.type = String(params.type)
    } else {
      params.type = "1"
    }

    this.setState({loading: true})
    try {
      const response = await API_PUT(`topUp/${userInfo.topup_uuid}`, params);    
      if(response.status === 422){
        apiFormValidation({ data: response.data.data, setErrors })
        notification.error({ message: "Success", description: "Something went wrong updating record" });
        setSubmitting(false)
        this.setState({loading: false})
      }else {   
        message.success('Record was successfully update.'); 
        this.setState({loading: false})
        this.props.history.push("/top-up");
      }
    } catch (error) {
      setSubmitting(false)
      this.setState({loading: false})
    }

  }

  handleResetValue=(props)=> {
    // this.setState({
    //   amount: 0
    // })
    props.setValues({...props.values, amount: ''})
  }

  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo, timerCount, isGenerated } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        {/* <HeaderForm 
          loading={loading}
          title="Update User"
          action={this.handleEditUserManagement}
          actionBtnName="Submit"
          withConfirm={{message: "Save changes to this record?"}}
          withCancelConfirm={{ message: 'Are you sure you want to discard changes?'}}
          cancel={()=> { this.props.history.push("/top-up")}}
          cancelBtnName="Cancel"
        /> */}
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                fee_code: userInfo.fee_code  || '',
                name: userInfo.name || '',
                amount: userInfo.amount || '',
                type: userInfo.type == "PH peso" ? 1 : 2
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
                  {...props}
                  loading={loading}
                  history={this.props.history}
                  handleResetValue={this.handleResetValue}
                />
              }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(TopUpEdit);