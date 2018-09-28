// LIBRARIES
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { notification, Icon } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewUserManagementForm from './components/ViewUserManagementForm'

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";


class UserManagementView extends Component {
  state = {
    mounted: false,
    userInfo: null
  }
  
  async componentDidMount() {

    const { match } = this.props;

    API_UNI_OIL.get(`admin/${match.params.id}`)        
    .then((response) => {
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    })
    .catch(({response: error}) => {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
      this.setState({ mounted: false })
    });
    
  }

  render() {

    const { userInfo } = this.state
    const { history, match } = this.props
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="User Accounts"
          action={()=> {this.props.history.push(`/user-management/edit/${match.params.id}`)}}
          actionBtnName="Update"
          styleBtn={{background: 'white', borderColor: 'rgb(184, 187, 201)',color: 'rgb(101, 105, 127)'}}
          deleteAction={()=> {console.log('delete button')}}
          deleteBtnName="Delete"
        />
        <div>
          <ViewUserManagementForm userInfo={userInfo} />
        </div>
      </div>
    )
  }
}


export default withRouter(UserManagementView);