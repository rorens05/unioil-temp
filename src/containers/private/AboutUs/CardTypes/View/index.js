// LIBRARIES
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewUserManagementForm from './components/ViewUserManagementForm'

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";


class CardTypeView extends Component {
  state = {
    mounted: false,
    userInfo: null
  }
  
  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`cardType/${match.params.id}`) 
      this.setState({
        userInfo: {...response.data.data},
        mounted: true
      })
    } catch ({response: error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong loading data.</div>
        - { error && error.data && error.data.message }
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

  delete = async (uuid) => {

    const { userInfo } = this.state;
    const { match } = this.props;

    try {
      await API_UNI_OIL.delete(`cardType/${userInfo.cardtype_uuid}`);
      message.success('Record was successfully deleted.');
      this.props.history.push("/about-us/card-types");
    } catch ({response:error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong deleting record.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 3, 
      });
    }
  }

  render() {

    if(!this.state.mounted) return null;
    
    const { userInfo } = this.state
    const { history, match } = this.props
    
    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Card Type Details"
          action={()=> {this.props.history.push(`/about-us/card-types/edit/${match.params.id}`)}}
          actionBtnName="Update"
          styleBtn={{background: 'white', borderColor: 'rgb(184, 187, 201)',color: 'rgb(101, 105, 127)'}}
          deleteAction={this.delete}
          deleteBtnName="Delete"
        />
        <div>
          <ViewUserManagementForm userInfo={userInfo} />
        </div>
      </div>
    )
  }
}


export default withRouter(CardTypeView);