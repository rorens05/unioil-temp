//@flow
import React, { Component } from 'react';
import queryString from "query-string";
import { API_UNI_OIL } from "utils/Api";
import { Row, Button, Col, Icon, Avatar } from 'antd';


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

  render() {

    const { loading, status } = this.state;

    return (
      <div align="center" id="1" style={{position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)'}}>
          {
            loading 
              ? <div style={{fontSize: '6vmin'}}>
                  <Icon type="sync" spin /> Loading Top-Up Please wait...
              </div>
              :
              <div style={{marginTop: '-40px'}}>
                {
                  status == 200 
                    ? 
                    <div>
                      <img src={ require("assets/img/ic_success.svg") } style={{ width: '84vmin'}} />
                      <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                        Your purchase for top-up points <br/> is successful.
                      </p>
                      <Button type="primary" href="?id=1" size="large" style={{backgroundColor: '#e74610', borderColor: '#e74610'}}>Back</Button>
                    </div>
                    : 
                    <div>
                      <img src={ require("assets/img/ic_error.svg") } style={{ width: '84vmin'}} />
                      <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                        Uh-oh! Your purchase for top-up <br/> is not successful. Please try again.
                      </p>
                      <Button type="primary" href="?id=1" size="large" style={{backgroundColor: '#e74610', borderColor: '#e74610'}}>Back</Button>
                    </div>
                }
              </div>
          }
      </div>
    )
  }
}


export default PublicTopSuccessPage;