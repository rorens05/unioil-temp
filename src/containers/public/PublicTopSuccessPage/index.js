//@flow
import React, { Component } from 'react';
import queryString from "query-string";
import { API_UNI_OIL } from "utils/Api";
import { Row, Button, Col, Icon, Avatar } from 'antd';
import dsBridge from 'dsbridge';


class PublicTopSuccessPage extends Component {
  state = {
    loading: false,
    userInfo: null
  }

  async componentDidMount() {
  
    const { location } = this.props;
    let { search } = location;
    let urlParamsObject = queryString.parse(search);
   
    let payload = {
      paymentId: urlParamsObject.paymentId,
      token: urlParamsObject.token,
      PayerID: urlParamsObject.PayerID
    }

    this.setState({ loading: true })

    try {
      let response = await API_UNI_OIL.post(`paypalExecute`,payload);
      this.setState({
        status: response.status,
        loading: false
      })
    } catch ({response: error}) {
      this.setState({
        status: error.status,
        loading: false
      })
    }
    
  }

  backHandler () {
    //alert('web call alert')
 

    let str = dsBridge.call("returnTopUpPage","showToast");
    
    dsBridge.call("showToast",(v) => {
      alert('inside dsBridge');
    })
    

    alert('im outside dsBridge');
  } 

  render() {

    const { loading, status } = this.state;

    return (
      <div align="center" id="1" style={{position: 'absolute', top: '50%', 
          left: 0, right: 0, transform: 'translateY(-50%)', height: '100%'}}>
          {
            loading 
              ? <div style={{fontSize: '6vmin'}}>
                  <Icon type="sync" spin /> Loading Top-Up Please wait...
              </div>
              :
              <div style={{marginTop: '16vmin'}}>
                {
                  status == 200 
                    ? 
                    <div>
                      <img src={ require("assets/img/ic_success.svg") } style={{ width: '18vmin'}} />
                      <p style={{ lineHeight: '7vmin', fontSize: '6vmin', 
                          fontWeight: 'bold', marginTop: '5vmin', marginBottom: 0
                      }}>
                        Your purchase for top-up points <br/> is successful!
                      </p>
                      <div style={{fontSize: '15px', fontWeight: 400}}>
                        <Row>
                          <Col span={24}><span style={{fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin'}}>20 Oct 2018 10:00 AM</span></Col>
                          <Col span={24}>Card Number 1111000000001234</Col>
                          <Col span={24}>Sales Invoice Number 0-1234567-69</Col>
                        </Row>
                        <div style={{marginTop: '5vmin'}}>
                          <Row type="flex" justify="space-around">
                            <Col span={8} style={{textAlign: 'left'}}>Top-up Points Value</Col>
                            <Col span={8} style={{textAlign: 'right'}}>500</Col>
                          </Row>
                          <Row type="flex" justify="space-around">
                            <Col span={8} style={{textAlign: 'left'}}>Payment Value</Col>
                            <Col span={8} style={{textAlign: 'right'}}>Php 500</Col>
                          </Row>
                          <Row type="flex" justify="space-around">
                            <Col span={8} style={{textAlign: 'left'}}>Paypal Fee</Col>
                            <Col span={8} style={{textAlign: 'right'}}>Php 500</Col>
                          </Row>
                        </div>
                      </div>
                      <div style={{position: 'fixed', bottom: 0,width: '100%'}}>
                        <Button 
                          type="primary" id="backSuccess" size="large" 
                          style={{backgroundColor: '#e74610', 
                            borderColor: '#e74610', margin: '4px', width: '90%'
                          }}>
                          Return to Home Page
                        </Button>
                      </div>
                    </div>
                    : 
                    <div>
                      <img src={ require("assets/img/ic_error.svg") } style={{ width: '24vmin'}} />
                      <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                        Your purchase for top-up is not <br/>successful. Please try again.
                      </p>
                      <div style={{position: 'fixed', bottom: 0,width: '100%'}}>
                        <Button 
                          onClick={this.backHandler} 
                          type="primary" id="backSuccess" size="large" 
                          style={{backgroundColor: '#e74610', 
                            borderColor: '#e74610', margin: '4px', width: '90%'
                          }}>
                          Return to Top-Up Page
                        </Button>
                      </div>
                    </div>
                }
              </div>
          }
      </div>
    )
  }
}


export default PublicTopSuccessPage;