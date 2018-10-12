// LIBRARIES
import React, { Component } from 'react'
import { notification, message } from "antd"

// COMPONENTS
import HeaderForm from 'components/Forms/HeaderForm'
import ViewPhotoSliderForm from './components/ViewPhotoSliderForm'

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";


class PhotoSliderView extends Component {
  state ={
    mounted: false,
    userInfo: null
  }
  
  async componentDidMount() {

    const { match } = this.props;

    try {
      let response = await API_UNI_OIL.get(`photoSlider/${match.params.id}`) 
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
        duration: 20, 
      });
      if(error.status == 404) {
        if(this.props.location.pathname)
          this.props.history.push(`${this.props.location.pathname}/404`);
      }
      this.setState({ mounted: false })
    }
    
  }

  delete = async (uuid) => {

    const { userInfo } = this.state
    const { match } = this.props;

    try {
      await API_UNI_OIL.delete(`photoSlider/${userInfo.photoslider_uuid}`);
      message.success('Record was successfully deleted.');
      this.props.history.push("/home-page/photo-slider");
    } catch ({response:error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong deleting record.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
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
          title="Photo Slider Accounts"
          action={()=> {this.props.history.push(`/home-page/photo-slider/edit/${match.params.id}`)}}
          styleBtn={{background: 'white', borderColor: 'rgb(184, 187, 201)',color: 'rgb(101, 105, 127)'}}
          actionBtnName="Update"
          deleteAction={this.delete}
          deleteBtnName="Delete"
        />
        <div>
          <ViewPhotoSliderForm userInfo={userInfo}/>
        </div>
      </div>
    )
  }
}


export default PhotoSliderView