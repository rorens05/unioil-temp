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
import { API_UNI_OIL } from "utils/Api";
import { apiFormValidation } from "utils/helper";

class EditUserManagement extends Component {
  state = {
    loading: false,
    userInfo: null,
    mounted: false,
    timerCount: 20,
    isGenerated: false
  }

  async componentDidMount() {
  
    const { match } = this.props;
    
    try {
      let response = await API_UNI_OIL.get(`admin/${match.params.id}`);
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
          this.props.history.push(`${this.props.location.pathname}/404`);
      } else {
        this.setState({ mounted: false })
      }
      
    }
    
  }

  handleEditUserManagement =()=> {
    this.form.submitForm()
  }

  handleSubmit = async (values, actions) => {

    const { setErrors, setSubmitting } = actions;
    const { userInfo, isGenerated } = this.state;
    let { history } = this.props;

    const params = {
      ...values,
    }

    if(params.password == "*******************" ) {
      delete params.password
    }

    this.setState({loading: true})
    try {
      const response = await API_PUT(`admin/${userInfo.admin_uuid}`, params);    
      if(response.status === 422){
        apiFormValidation({ data: response.data.data, setErrors })

        let errors  = []
        if(response.data) {
          if(response.data.data)
            for(const key of Object.keys(response.data.data)) {
              errors.push(response.data.data[key][0])
            }
        }
        notification.error({ 
          message: "Error", 
          description: 
          <div>
              <div>Something went wrong updating record</div>
              { response && response.data && response.data.data &&
                errors.map(item =><div>- {item}</div>) 
              }
              {/* {
                Object.keys(response.data.data).forEach(function(key) {
                  <div>{response.data.data[key][0]}</div>
                })
              } */}
          </div>
        });
        setSubmitting(false)
        this.setState({loading: false})
      } else {
        let messageSuccess = isGenerated 
          ? 'User account updated successfully. Please send the new temporary password to the user.'
          : 'User account updated successfully.'
        
        message.success(messageSuccess);
        this.setState({loading: false})
        this.props.history.push("/user-management");
      }
    } catch ({response:error}) {
      setSubmitting(false)
      this.setState({loading: false})
    }

  }

  generatePassword = async (props) => {

    const { userInfo } = this.state;
    let params = {}; params.admin_uuid = userInfo.admin_uuid

    this.setState({loading: true})
    try {
      let response = await API_POST('generatePassword', params)
      if(response) {
        props.setValues({...props.values, password: response.data.data.password})
        this.setState({loading: false, isGenerated: true})
      }
    } catch ({response: error}) {
      notification.error({ 
          message: 'Error', 
          description: <div>
            <div>Something went wrong generating password.</div>
            {/* - {error && (error)} */}
          </div>
      })
      this.setState({loading: false})
    }
  }

  copyActionHandler = (props) => {
    if(props.values.password) {
      navigator.clipboard.writeText(props.values.password);
      message.success('Password successfully copied.');
    }
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
          cancel={()=> { this.props.history.push("/user-management")}}
          cancelBtnName="Cancel"
        /> */}
        <div>
          <h2 style={{margin: '25px 35px'}}>User Details</h2>
          <Formik
              initialValues={{
                username: userInfo.username  || '',
                password: userInfo.password || '',
                firstname: userInfo.firstname || '',
                lastname: userInfo.lastname || '',
                email: userInfo.email || '',
                role: userInfo.role || '',
                status: userInfo.status || '',
                password: 
                  userInfo.generated_password ? userInfo.generated_password : "*******************"
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <EditUserManagementForm 
                  {...props}
                  loading={loading}
                  userInfo={userInfo}
                  history={this.props.history}
                  generatePassword={this.generatePassword}
                  isGenerated={(isGenerated || userInfo.generated_password) && true}
                  copyActionHandler={this.copyActionHandler}
                />
              }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(EditUserManagement);