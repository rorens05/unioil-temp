// LIBRARIES
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewTopUpForm from './components/ViewTopUpForm'

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";


class TopUpView extends Component {
  state = {
    mounted: false,
    userInfo: null
  }
  
  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`topUp/${match.params.id}`) 
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong.</div>
        - {error.data.message}
        </div> , 
        duration: 20, 
      });
      this.setState({ mounted: false })
    }
    
  }

  delete = async (uuid) => {

    const { match } = this.props;

    try {
      await API_UNI_OIL.delete(`topUp/${match.params.id}`);
      message.success('Succesfully delete record.');
      this.props.history.push("/top-up");
    } catch (error) {
      message.info('Something went wrong deleting record.');
    }
  }

  render() {

    const { userInfo } = this.state
    const { history, match } = this.props

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="User Accounts"
          action={()=> {this.props.history.push(`/top-up/edit/${match.params.id}`)}}
          actionBtnName="Update"
          styleBtn={{background: 'white', borderColor: 'rgb(184, 187, 201)',color: 'rgb(101, 105, 127)'}}
          deleteAction={this.delete}
          deleteBtnName="Delete"
        />
        <div>
          <ViewTopUpForm userInfo={userInfo} />
        </div>
      </div>
    )
  }
}


export default withRouter(TopUpView);