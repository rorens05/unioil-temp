// LIBRARIES
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { notification, Icon } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import LockAccountViewForm from './components/LockAccountViewForm'

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";

class LockAccountView extends Component {
  
  state = { 
    userInfo: null
  }

  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`locked/${match.params.id}`) 
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
              <div>Something went wrong viewing data.</div>
               {error && error.data && (- error.data.message)}
            </div> , 
        duration: 20, 
      });
      this.setState({ mounted: false })
    }
  }

  render() {

    const { history } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Locked Accounts"
          action={()=> {console.log('activate account')}}
          actionBtnName="Activate Account"
        />
        <div>
          <LockAccountViewForm />
        </div>
      </div>
    )
  }
}


export default withRouter(LockAccountView);