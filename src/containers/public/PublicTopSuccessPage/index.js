//@flow
import React, { Component } from 'react';
import queryString from "query-string";
import { API_UNI_OIL } from "utils/Api";
import { Row, Button, Col, Icon, Avatar } from 'antd';
import {isAndroid, isIOS} from 'react-device-detect';


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
        userInfo: {...response.data.data},
        loading: false
      })
    } catch ({response: error}) {
      this.setState({
        status: error.status,
        loading: false,
        message: error && error.data && error.data.message
      })
    }
    
  }

  backHandler () {

    if(isIOS) {
      // For iOS isIOS
      window.iOStopUpFailed()
    }

    if (isAndroid) {
      // For Adoird isAndroid
      window.AndroidTopUpFailed()
    }

  } 

  backHandlerSuccess () {
    if(isIOS) {
      // For iOS isIOS
      window.iOStopUpSuccess()
    }

    if (isAndroid) {
      // For Adoird isAndroid
      window.AndroidTopUpFailed()
    }
  }

  render() {

    const { loading, status, userInfo, message } = this.state;

    return (
      <div id="1">
          {
            loading 
              ? <div style={{fontSize: '6vmin',...styles.topAlign, top:'45%'}}>
                  <Icon type="sync" spin /> Loading Top-Up Please wait...
              </div>
              :
              <div style={{marginTop: '11vmin'}}>
                {
                  status == 200 
                    ? 
                    <div>
                      <div style={{...styles.topAlign}}>
                        <img src={ require("assets/img/ic_success.svg") } style={{ width: '18vmin'}} />
                        <p style={{ lineHeight: '7vmin', fontSize: '6vmin', 
                            fontWeight: 'bold', marginTop: '5vmin', marginBottom: 0
                        }}>
                        Your purchase for top-up points <br/> is successful!
                        </p>
                        <div style={{fontSize: '15px', fontWeight: 400}}>
                          <Row>
                            <Col span={24}>
                              <span style={{fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin'}}>
                                {userInfo && userInfo.date}
                              </span>
                            </Col>
                            <Col span={24}>{userInfo && `Card Number ${userInfo.card_number}`}</Col>
                            <Col span={24}>{userInfo && `Sales Invoice Number ${userInfo.invoice}`}</Col>
                          </Row>
                          <div style={{marginTop: '5vmin' , fontSize: '3.5vmin'}}>
                            <Row type="flex" justify="space-around">
                              <Col span={8} style={{textAlign: 'left'}}>Top-up Points Value</Col>
                              <Col span={8} style={{textAlign: 'right'}}>{userInfo && ` ${userInfo.points}`}</Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                              <Col span={8} style={{textAlign: 'left'}}>Payment Value</Col>
                              <Col span={8} style={{textAlign: 'right'}}>{userInfo && `Php ${userInfo.payment_val}`}</Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                              <Col span={8} style={{textAlign: 'left'}}>Paypal Fee</Col>
                              <Col span={8} style={{textAlign: 'right'}}>{userInfo && `Php ${userInfo.paypal_fee}`}</Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                      <div style={{...styles.bottomAlign}}>
                        <Button 
                          onClick={this.backHandlerSuccess}
                          type="primary" id="backSuccess" size="large" 
                          style={{backgroundColor: '#e74610', 
                            borderColor: '#e74610', width: '100%', height: '11vmin', fontSize: '5vmin',lineHeight: 1
                          }}>
                          Return to Home Page
                        </Button>
                      </div>
                    </div>
                    : 
                    <div>
                      <div style={{...styles.topAlign}}>
                        <img src={ require("assets/img/ic_error.svg") } style={{ width: '24vmin'}} />
                        <p style={{ lineHeight: '7vmin', fontSize: '5vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                          {/* Your purchase for top-up is not <br/>successful. Please try again. */}
                          Transaction Failed.<br/>
                          {message && `${message}.`}
                        </p>
                      </div>
                      <div style={{...styles.bottomAlign}}>
                        <Button 
                          onClick={this.backHandler} 
                          type="primary" id="backSuccess" size="large" 
                          style={{backgroundColor: '#e74610', 
                            borderColor: '#e74610', width: '100%', height: '11vmin', fontSize: '5vmin',lineHeight: 1
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


const styles = {
  bottomAlign: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    left: '0',
    padding: '1rem',
    textAlign: 'center'
  },
  topAlign: {
    position: 'absolute',
    right: '0',
    top: '0',
    left: '0',
    padding: '1rem',
    textAlign: 'center'
  },
}