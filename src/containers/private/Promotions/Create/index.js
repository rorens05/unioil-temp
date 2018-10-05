// LIBRARIES
import React, { Component } from 'react'
import { Formik } from 'formik'
import { message, notification } from 'antd';
 
// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import AddPromotionForm from './components/AddPromotionForm'
 
// HELPER FUNCTIONS
import { userDetailsSchema } from './validationSchema'
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api";



class CreateManagement extends Component {
  state = {
    branchesOptionList: null,
    mounted: false
  }

  handleSubmit = async (values, actions) => {
    console.log('handleSubmit',values);
    message.success('New record added.');
  }
  handleAddUser =()=> {
    this.form.submitForm()
  }

  async componentDidMount () {

    try {
      let station = await API_GET('getStations');

      let promoTypes = await API_GET('promoTypes');

      if(station) {

        let branchesOptionList = []

        await station.data.data.map(item => {
          branchesOptionList.push({
            label: item.description,
            value: item.station_uuid
          })
        })

        // await station.data.data.map(item => {
        //   promoTypesOptionList.push({
        //     label: item.description,
        //     value: item.station_uuid
        //   })
        // })

        this.setState({
          branchesOptionList: branchesOptionList,
          mounted: true
        })
      }
    } catch ({response: error}) {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
      this.setState({ mounted: false })
    }
  }

  render() {

    if(!this.state.mounted) return null;

    const { branchesOptionList } = this.state

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '10px'}}>
        <HeaderForm 
          title="Promotions"
          action={this.handleAddUser}
          actionBtnName="Save"
          cancel={()=> {console.log('cancel button')}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Promotion Content Details</h2>
          <Formik
              initialValues={{
                title: ''
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <AddPromotionForm 
                  {...props}
                  branchesOptionList={branchesOptionList}
                />
              }
          />
        </div>
      </div>
    )
  }
}



export default CreateManagement;