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
      <div id="1">
          <div style={{...styles.topAlign}}>
            <img src={ require("assets/img/ic_error.svg") } style={{ width: '24vmin'}} />
            <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
              Transaction Failed.<br/>
              Your purchase for top-up is not <br/>successful. Please try again.
            </p>
          </div>
          <div style={{...styles.bottomAlign}}>
            <Button 
              onClick={this.backHandler} 
              type="primary" id="backError" size="large" 
              style={{backgroundColor: '#e74610', 
                borderColor: '#e74610', width: '100%', height: '11vmin', fontSize: '5vmin',lineHeight: 1
              }}>
              Return to Top-Up Page
            </Button>
          </div>
      </div>
    )
  }
}


export default PublicTopErrorPage;


const styles = {
  bottomAlign: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    left: '0',
    margin: '20px',
    textAlign: 'center'
  },
  topAlign: {
    position: 'absolute',
    right: '0',
    top: '10%',
    left: '0',
    margin: '20px',
    textAlign: 'center'
  },
}