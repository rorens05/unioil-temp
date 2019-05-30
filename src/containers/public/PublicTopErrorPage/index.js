//@flow
import React, { Component } from 'react';
import { Button } from 'antd';
import {isAndroid, isIOS} from 'react-device-detect';


class PublicTopErrorPage extends Component {
  state = {
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

  render() {

    return (
      <div align="center" id="1" style={{position: 'absolute', top: '50%', 
          left: 0, right: 0, transform: 'translateY(-50%)', height: '100%'}}>
           

          <div style={{marginTop: '16vmin'}}>
          <div>
            <img src={ require("assets/img/ic_error.svg") } style={{ width: '24vmin'}} />
            <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
              Transaction Failed.<br/>
              Your purchase for top-up is not <br/>successful. Please try again.
            </p>
            <div style={{position: 'fixed', bottom: 0,width: '100%' , marginBottom: '3vmin'}}>
              <Button 
                onClick={this.backHandler} 
                type="primary" id="backError" size="large" 
                style={{backgroundColor: '#e74610', 
                  borderColor: '#e74610', margin: '15px', width: '90%', height: '44px'
                }}>
                Return to Top-Up Page
              </Button>
            </div>
          </div>
          </div>
      </div>
    )
  }
}


export default PublicTopErrorPage;