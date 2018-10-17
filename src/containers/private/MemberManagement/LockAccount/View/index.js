// LIBRARIES
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { notification, Icon, message } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import LockAccountViewForm from './components/LockAccountViewForm'

// HELPER FUNCTIONS
import { API_UNI_OIL, API_POST } from "utils/Api";

class LockAccountView extends Component {
  
  state = { 
    userInfo: null,
    loading: false
  }

  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`member/${match.params.id}`) 
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
        duration: 20, 
      });
      if(error.status == 404) {
        if(this.props.location.pathname)
          this.props.history.push(`${this.props.location.pathname}/404`);
      } else {
        this.setState({ mounted: false })
      }
    }
  }

  activateAccount = async ()=> {
    const { match,history } = this.props;

    this.setState({loading: true})
    try {
      let response = await API_POST(`memberActivate/${match.params.id}`);
      message.success('Record was successfully update.');
      history.replace({ pathname: '/member-management/lock-account' });
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong updating record.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
      });
      this.setState({loading: false})
    }
  }

  render() {

    const { userInfo,loading } = this.state
    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Locked Accounts"
          action={this.activateAccount}
          actionBtnName="Activate Account"
          loading={loading}
        />
        <div>
          <LockAccountViewForm userInfo={userInfo}/>
        </div>
      </div>
    )
  }
}


export default withRouter(LockAccountView);