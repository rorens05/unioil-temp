// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { withRouter } from "react-router-dom"
import { notification, Icon } from "antd"

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import EditUserManagementForm from './components/EditUserManagementForm'

// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_PUT, API_POST } from "utils/Api";
import { API_UNI_OIL } from "utils/Api";

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
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
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

    if(params.password == "*******************" ) {
      params.password = null
    }

    this.setState({loading: true})
    try {
      const response = await API_PUT(`admin/${userInfo.admin_uuid}`, params);    
      if(response.status === 422){
     
        notification.error({ 
          message: "Error", 
          description: 
          <div>
              <div>Something went wrong updating record</div>
              - {response.data && (response.data.data.username[0])}
          </div>
        });
        setSubmitting(false)
        this.setState({loading: false})
      }else {
        notification.success({ message: "Success", description: "Record Successfully updated" });
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

  render() {

    if(!this.state.mounted) return null;

    const { loading, userInfo, timerCount, isGenerated } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          loading={loading}
          title="Update User"
          action={this.handleEditUserManagement}
          actionBtnName="Update"
          withConfirm={{message: "Save changes to this record?"}}
          cancel={()=> { this.props.history.push("/user-management")}}
          cancelBtnName="Cancel"
        />
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
                  generatePassword={this.generatePassword}
                  isGenerated={(isGenerated || userInfo.generated_password) && true}
                />
              }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(EditUserManagement);