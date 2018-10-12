// LIBRARIES
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Formik } from 'formik'
import { message,notification } from 'antd';

// COMPONENTS
import HeaderForm from "components/Forms/HeaderForm"
import TopUpCreateForm from './components/TopUpCreateForm'

// HELPER FUNCTIONS
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api";
import { customAction } from "actions";
import { userDetailsSchema } from './validationSchema'


class TopUpCreate extends Component {
  state = {
    generatedCode: null,
    mounted: false,
    loading: false,
  }

  async componentDidMount() {

    const { match } = this.props;

    if(match.path == "/top-up/create") {
      try {
        let response = await API_UNI_OIL.get(`generateFeeCode`);
        this.setState({
          generatedCode: {...response.data.data},
          mounted: true
        })
      } catch ({response: error}) {
        notification.error({ 
          message: "Error", 
          description: <div>
            <div>Something went wrong generating fee code.</div>
          - { error && error.data && error.data.message }
          </div> , 
          duration: 20, 
        });
        this.setState({ mounted: false })
      }
    }

  }

  handleSubmit = async (values, actions) => {
  
      let { history } = this.props;
      let params  = { ...values }
      this.setState({ loading: true });

      try {
        const response = await API_UNI_OIL.post('topUp',params);
        if(response) {
          message.success('New record added.');
          this.setState({ loading: false });
          history.push({ pathname: '/top-up' });
        }
       
      } catch ({response:error}) {
        notification.error({ 
          message: 'Error', 
          description: <div>
            Something went creating new record..
            { error && error.data && error.data.data && error.data.data.name 
                && (<div>- {error.data.data.name[0]} </div>) }
          </div>
        });
        this.setState({ loading: false });
      }
    
  }
  
  handleCreateTopUp =()=> {
    this.form.submitForm()
  }


  render() {

    if(!this.state.mounted) return null;

    const { loading, generatedCode } = this.state;

    return (
      <div style={{ border:'1px solid #E6ECF5' , paddingBottom: '40px'}}>
        <HeaderForm 
          loading={loading}
          title="Top-Up"
          action={this.handleCreateTopUp}
          actionBtnName="Save"
          cancel={()=> { this.props.history.push("/top-up")}}
          cancelBtnName="Cancel"
        />
        <div>
          <h2 style={{margin: '25px 35px'}}>Top-Up Details</h2>
          <Formik
              initialValues={{
                fee_code: generatedCode.fee_code || '',
                name: '',
                amount: '',
              }}
              ref={node => (this.form = node)}
              enableReinitialize={true}
              validationSchema={userDetailsSchema}
              onSubmit={this.handleSubmit }
              render = {(props)=> 
                <TopUpCreateForm 
                  {...props}
                  loading={loading}
                />
              }
          />
        </div>
      </div>
    )
  }
}


TopUpCreate = connect(
  state => ({
    //userInfo: state
    userManagement: state.userManagement,
  }),
  { customAction }
)(TopUpCreate);

export default TopUpCreate;